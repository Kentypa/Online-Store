import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, EntityManager } from "typeorm";
import { Category } from "../entities/category.entity";
import { CategoryTranslation } from "../entities/category-translation.entity";
import { Language } from "src/shared/entities/language.entity";
import { CategoryData } from "../types/category-data.type";
import { CategoryNode } from "../types/category-node.type";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class CategorySeederService {
  private readonly logger = new Logger(CategorySeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTranslation)
    private readonly translationRepository: Repository<CategoryTranslation>,
    @InjectRepository(Language)
    private readonly langRepository: Repository<Language>,
  ) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log("Starting categories seeding...");

      const existingCount = await queryRunner.manager.count(Category);
      if (existingCount > 0) {
        this.logger.log(
          `Categories already exist (${existingCount} rows), skipping seeding.`,
        );
        await queryRunner.rollbackTransaction();
        return;
      }

      await this.createCategories(queryRunner.manager);

      await queryRunner.commitTransaction();
      this.logger.log("Categories seeding completed successfully.");
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error("Error during categories seeding:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createCategories(manager: EntityManager) {
    const basePath = path.join(process.cwd(), "src", "data", "categories");

    const ukPath = path.join(basePath, "ukraine_categories.json");
    const enPath = path.join(basePath, "united_kingdom_categories.json");

    const ukCategories = JSON.parse(
      fs.readFileSync(ukPath, "utf8"),
    ) as CategoryData;

    const enCategories = JSON.parse(
      fs.readFileSync(enPath, "utf8"),
    ) as CategoryData;

    this.logger.log("Starting recursive category creation.");
    await this.processCategoryLevel(enCategories, ukCategories, null, manager);
  }

  private async processCategoryLevel(
    enNode: CategoryNode,
    ukNode: CategoryNode,
    parent: Category | null,
    manager: EntityManager,
  ) {
    const enKeys = Object.keys(enNode).filter((k) => k !== "icon_name");
    const ukKeys = Object.keys(ukNode).filter((k) => k !== "icon_name");

    if (enKeys.length !== ukKeys.length) {
      throw new Error(
        `Mismatched structure between language files at level with parent: ${parent?.id}`,
      );
    }

    for (let i = 0; i < enKeys.length; i++) {
      const enName = enKeys[i];
      const ukName = ukKeys[i];

      const enSubNode = enNode[enName];
      const ukSubNode = ukNode[ukName];

      const imageUrl =
        typeof enNode.icon_name === "string"
          ? `/assets/icons/categories/${enNode.icon_name}.svg`
          : undefined;

      const newCategory = this.categoryRepository.create({
        parent: parent ?? undefined,
        image_url: imageUrl,
      });

      const savedCategory = await manager.save(newCategory);

      const enTranslation = this.translationRepository.create({
        category_id: savedCategory.id,
        lang_code: "en",
        name: enName,
      });
      await manager.save(enTranslation);

      const ukTranslation = this.translationRepository.create({
        category_id: savedCategory.id,
        lang_code: "uk",
        name: ukName,
      });
      await manager.save(ukTranslation);

      this.logger.log(`Created category: ${enName} / ${ukName}`);

      if (
        enSubNode &&
        typeof enSubNode === "object" &&
        Object.keys(enSubNode).filter((k) => k !== "icon_name").length > 0 &&
        ukSubNode &&
        typeof ukSubNode === "object"
      ) {
        await this.processCategoryLevel(
          enSubNode,
          ukSubNode,
          savedCategory,
          manager,
        );
      }
    }
  }
}
