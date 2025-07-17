import { fakerEN, fakerUK } from "@faker-js/faker";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs";
import * as path from "path";
import { Region } from "src/geo/entities/region.entity";
import { Category } from "src/store/categories/entities/category.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { ProductStats } from "../entities/product-stats.entity";
import { ProductTranslation } from "../entities/product-translation.entity";
import { Product } from "../entities/product.entity";
import { PeriodTypeEnum } from "../enums/period-type.enum";

@Injectable()
export class ProductSeederService {
  private readonly logger = new Logger(ProductSeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private readonly productTranslationRepository: Repository<ProductTranslation>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(ProductStats)
    private readonly productStatsRepository: Repository<ProductStats>,
  ) {}

  async seed(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log("Starting fast seeding...");

      const existingCount = await queryRunner.manager.count(Product);
      if (existingCount > 0) {
        this.logger.log(`Products already exist (${existingCount}), skip.`);
        await queryRunner.rollbackTransaction();
        return;
      }

      await this.createProducts(queryRunner.manager);

      await queryRunner.commitTransaction();
      this.logger.log("Seeding done");
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error("Seeding failed:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createProducts(manager: EntityManager): Promise<void> {
    const [allRegions, allCategories] = await Promise.all([
      this.regionRepository.find(),
      this.categoryRepository.find(),
    ]);

    const leafCategories = allCategories.filter((cat) =>
      allCategories.every((c) => c.parent_id !== cat.id),
    );

    const imageDir = path.join(process.cwd(), "public", "products", "images");
    const imageFiles = fs
      .readdirSync(imageDir)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

    if (imageFiles.length === 0) {
      throw new Error("No product images found.");
    }

    const products: Array<Partial<Product>> = [];
    for (const category of leafCategories) {
      for (let i = 0; i < 100; i++) {
        const mainImage = fakerEN.helpers.arrayElement(imageFiles);
        const otherImages = fakerEN.helpers.arrayElements(
          imageFiles.filter((f) => f !== mainImage),
          fakerEN.number.int({ min: 1, max: 4 }),
        );

        products.push({
          price: fakerEN.number.int({ min: 10, max: 1000 }),
          currency: "USD",
          stock: fakerEN.number.int({ min: 0, max: 100 }),
          main_image_url: `/products/images/${mainImage}`,
          other_image_urls: otherImages.map((img) => `/products/images/${img}`),
          category_id: category.id,
        });
      }
    }

    const chunkSize = 500;

    this.logger.log(`Inserting ${products.length} products in chunks...`);
    const productIds: number[] = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      const chunk = products.slice(i, i + chunkSize);
      const inserted = await manager.insert(Product, chunk);
      const ids = inserted.identifiers.map(
        (idObj) => (idObj as { id: number }).id,
      );
      productIds.push(...ids);
    }
    this.logger.log("Product insertion complete.");

    const translations: Array<Partial<ProductTranslation>> = [];
    const stats: Array<Partial<ProductStats>> = [];

    const periodDate = new Date();
    const periodType = PeriodTypeEnum.MONTHLY;
    const defaultRegion = fakerEN.helpers.arrayElement(allRegions);

    for (const productId of productIds) {
      translations.push(
        {
          product_id: productId,
          lang: "uk",
          title: fakerUK.commerce.productName() + "UA",
          description: fakerUK.commerce.productDescription() + "UA",
        },
        {
          product_id: productId,
          lang: "en",
          title: fakerEN.commerce.productName() + "EN",
          description: fakerEN.commerce.productDescription() + "EN",
        },
      );

      stats.push({
        product_id: productId,
        region_id: defaultRegion.id,
        total_sold: fakerEN.number.int({ min: 0, max: 1000 }),
        period_type_code: periodType,
        period_date: periodDate,
      });
    }

    await this.insertInChunks(
      manager,
      ProductTranslation,
      translations,
      chunkSize,
      "ProductTranslations",
    );

    await this.insertInChunks(
      manager,
      ProductStats,
      stats,
      chunkSize,
      "ProductStats",
    );

    this.logger.log(
      `Inserted: ${productIds.length} products, ${translations.length} translations, ${stats.length} stats`,
    );
  }

  private async insertInChunks<T>(
    manager: EntityManager,
    entity: { new (): T },
    items: Partial<T>[],
    chunkSize = 500,
    logPrefix = "Insert",
  ): Promise<void> {
    this.logger.log(
      `${logPrefix}: inserting ${items.length} records in chunks of ${chunkSize}...`,
    );
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      await manager.insert(entity, chunk);
    }
    this.logger.log(`${logPrefix}: done.`);
  }
}
