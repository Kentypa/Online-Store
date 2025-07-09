import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { CategoryTranslation } from "../entities/category-translation.entity";
import { Category } from "../entities/category.entity";
import { MasterCategoryNode } from "../types/master-category-node.type";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTranslation)
    private categoryTranslationRepository: Repository<CategoryTranslation>,
  ) {}

  async getCategoryTree(
    langCode?: string,
    parent_id: number | null = null,
  ): Promise<MasterCategoryNode[]> {
    const allCategories = await this.categoryRepository.find({
      relations: ["translations"],
    });

    if (!allCategories.length) {
      return [];
    }

    const nodeMap = new Map<number, MasterCategoryNode>();

    allCategories.forEach((category) => {
      const filteredTranslations = langCode
        ? category.translations.filter((t) => t.lang_code === langCode)
        : category.translations;

      nodeMap.set(category.id, {
        id: category.id,
        parent_id: category.parent_id,
        image_url: category.image_url,
        translations: filteredTranslations,
        children: [],
      });
    });

    const tree: MasterCategoryNode[] = [];
    nodeMap.forEach((node) => {
      if (node.parent_id && nodeMap.has(node.parent_id)) {
        nodeMap.get(node.parent_id)!.children.push(node);
      } else {
        tree.push(node);
      }
    });

    if (parent_id === null) {
      return tree;
    } else {
      const parentNode = nodeMap.get(parent_id);
      return parentNode ? parentNode.children : [];
    }
  }

  async getCategories(
    langCode?: string,
    parent_id?: number,
  ): Promise<CategoryTranslation[]> {
    const options: FindManyOptions<CategoryTranslation> = {
      relations: ["category"],
      where: {},
    };
    if (langCode) {
      options.where = { ...options.where, lang_code: langCode };
    }
    if (parent_id) {
      options.where = { ...options.where, category: { parent_id: parent_id } };
    }

    return this.categoryTranslationRepository.find(options);
  }
}
