import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getProductsDto } from "./dto/get-products.dto";
import { ProductTranslation } from "./entities/product-translation.entity";
import { SortProductsBy } from "./enums/sort-products-by.enum";
import { responseProductsDto } from "./dto/response-products.dto";
import { CategoryService } from "../categories/category.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductTranslation)
    private productTranslationRepository: Repository<ProductTranslation>,
    private readonly categoryService: CategoryService,
  ) {}

  async getProducts({
    ids,
    langCode,
    limit,
    offset,
    regionId,
    sortBy,
    categoryId,
    withReviews = false,
    query,
  }: getProductsDto): Promise<responseProductsDto> {
    const qb = this.productTranslationRepository
      .createQueryBuilder("translation")
      .leftJoinAndSelect("translation.product", "product")
      .leftJoinAndSelect("product.stats", "stats");

    if (withReviews) {
      qb.leftJoinAndSelect("product.reviews", "reviews");
    }

    if (query) {
      qb.addSelect(
        `ts_rank(translation.search_vector, plainto_tsquery('simple', :query))`,
        "rank",
      )
        .where(
          "translation.search_vector @@ plainto_tsquery('simple', :query)",
          { query },
        )
        .orderBy("rank", "DESC");
    }

    if (sortBy) {
      switch (sortBy) {
        case SortProductsBy.TOTAL_SOLD_DESC:
          qb.orderBy("stats.total_sold", "DESC").addOrderBy(
            "product.id",
            "ASC",
          );
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
    }

    if (langCode) {
      qb.andWhere("translation.lang = :langCode", { langCode });
    }

    if (!query && ids) {
      qb.andWhere("product.id IN (:...ids)", { ids });
    }

    if (categoryId) {
      const categoryTree = await this.categoryService.getCategoryTree();
      const categoryIds = this.categoryService.getDescendantCategoryIdsFromTree(
        categoryTree,
        categoryId,
      );

      qb.andWhere("product.category_id IN (:...categoryIds)", {
        categoryIds,
      });
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
