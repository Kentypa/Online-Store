import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { ProductTranslation } from "./entities/product-translation.entity";
import { responseProductsDto } from "./dto/response-products.dto";
import { GetProductsQuery } from "./dto/get-products.query";

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
    @Query()
    {
      categoryId,
      ids,
      langCode,
      limit,
      offset,
      query,
      regionId,
      sortBy,
      withReviews,
    }: GetProductsQuery,
  ): Promise<responseProductsDto> {
    return this.productsService.getProducts({
      ids,
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
