import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { ProductTranslation } from "./entities/product-translation.entity";
import { SortProductsBy } from "./enums/sort-products-by.enum";
import { responseProductsDto } from "./dto/responseProducts.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Get regions with their translations" })
  @ApiResponse({
    status: 200,
    description: "Categories",
    type: ProductTranslation,
  })
  @HttpCode(200)
  async getProducts(
    @Query("langCode") langCode?: string,
    @Query("ids") ids?: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("regionId") regionId?: number,
    @Query("sortBy") sortBy?: SortProductsBy,
    @Query("categoryId") categoryId?: number,
    @Query("withReviews") withReviews?: boolean,
    @Query("query") query?: string,
  ): Promise<responseProductsDto> {
    const parsedIds = ids?.split(",").map(Number).filter(Boolean);

    return this.productsService.getProducts({
      ids: parsedIds,
      langCode,
      limit,
      offset,
      regionId,
      sortBy,
      categoryId,
      withReviews,
      query,
    });
  }
}
