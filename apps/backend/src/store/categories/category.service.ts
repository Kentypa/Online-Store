import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { CategoryTranslation } from "./entities/category-translation.entity";
import { Category } from "./entities/category.entity";
import { MasterCategoryNode } from "./types/master-category-node.type";
import { Cached } from "src/shared/decorators/cached.decorator";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTranslation)
    private categoryTranslationRepository: Repository<CategoryTranslation>,
  ) {}

  getDescendantCategoryIdsFromTree(
    tree: MasterCategoryNode[],
    rootId: number,
  ): number[] {
    const ids: number[] = [];

    const findNode = (
      nodes: MasterCategoryNode[],
    ): MasterCategoryNode | null => {
      for (const node of nodes) {
        if (node.id === rootId) return node;
        const foundChild = findNode(node.children);
        if (foundChild) return foundChild;
      }
      return null;
    };

    const traverse = (node: MasterCategoryNode) => {
      ids.push(node.id);
      node.children.forEach(traverse);
    };

    const rootNode = findNode(tree);
    if (rootNode) {
      traverse(rootNode);
    }

    return ids;
  }

  @Cached(
    300,
    (categoryId: number, parents: number[]) =>
      `category_parent_ids:${categoryId ?? "nothing"}:${Array.isArray(parents) ? parents.join(",") : "no-parents"}`,
  )
  async getParentCategoryIds(
    categoryId: number,
    parents: number[] = [],
  ): Promise<number[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (category && category.parent_id !== null) {
      parents.push(category.parent_id);
      return this.getParentCategoryIds(category.parent_id, parents);
    }

    return parents;
  }

  @Cached(
    300,
    (langCode?: string, parent_id?: number) =>
      `category_tree:${langCode ?? "all"}:${parent_id ?? "root"}`,
  )
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

  @Cached(
    300,
    (langCode?: string, parent_id?: number) =>
      `categories:${langCode ?? "all"}:${parent_id ?? "root"}`,
  )
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
