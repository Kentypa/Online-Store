import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getProductsDto } from "./dto/getProducts.dto";
import { ProductStats } from "./entities/product-stats.entity";
import { ProductTranslation } from "./entities/product-translation.entity";
import { Product } from "./entities/product.entity";
import { SortProductsBy } from "./enums/sort-products-by.enum";
import { responseProductsDto } from "./dto/responseProducts.dto";
import { CategoryService } from "../categories/category.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private productTranslationRepository: Repository<ProductTranslation>,
    @InjectRepository(ProductStats)
    private productStatsRepository: Repository<ProductStats>,
    private readonly categoryService: CategoryService,
  ) {}

  async getProducts({
    id,
    langCode,
    limit,
    offset,
    regionId,
    sortBy,
    categoryId,
  }: getProductsDto): Promise<responseProductsDto> {
    const qb = this.productTranslationRepository
      .createQueryBuilder("translation")
      .leftJoinAndSelect("translation.product", "product")
      .leftJoinAndSelect("product.stats", "stats");

    switch (sortBy) {
      case SortProductsBy.TOTAL_SOLD_DESC:
        qb.orderBy("stats.total_sold", "DESC").addOrderBy("product.id", "ASC");
        break;
      case SortProductsBy.PRICE_ASC:
        qb.orderBy("product.price", "ASC");
        break;
      case SortProductsBy.PRICE_DESC:
        qb.orderBy("product.price", "DESC");
        break;
      default:
        qb.orderBy("product.id", "DESC");
        break;
    }

    if (langCode) {
      qb.andWhere("translation.lang = :langCode", { langCode });
    }

    if (id) {
      qb.andWhere("product.id = :id", { id });
    }

    if (categoryId) {
      const categoryTree = await this.categoryService.getCategoryTree();
      const categoryIds = this.categoryService.getDescendantCategoryIdsFromTree(
        categoryTree,
        categoryId,
      );
      if (categoryIds.length > 0) {
        qb.andWhere("product.category_id IN (:...categoryIds)", {
          categoryIds,
        });
      } else {
        qb.andWhere("FALSE");
      }
    }

    if (regionId) {
      qb.andWhere("stats.region_id = :regionId", { regionId });
    }

    qb.skip(offset ?? 0);
    qb.take(limit ?? 10);

    const [data, total] = await qb.getManyAndCount();

    return { data, total };
  }
}
