import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CategoryTranslation } from "./entities/category-translation.entity";
import { MasterCategoryNode } from "./types/master-category-node.type";
import { GetCategoriesQuery } from "./dto/get-categories.query";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("categories")
  @ApiOperation({ summary: "Get regions with their translations" })
  @ApiResponse({
    status: 200,
    description: "Categories",
    type: CategoryTranslation,
  })
  @HttpCode(200)
  async getCategories(
    @Query() { langCode, parentId }: GetCategoriesQuery,
  ): Promise<CategoryTranslation[]> {
    return this.categoryService.getCategories(langCode, parentId);
  }

  @Get("categories-tree")
  @ApiOperation({ summary: "Get regions with their translations" })
  @ApiResponse({
    status: 200,
    description: "Categories",
    type: CategoryTranslation,
  })
  @HttpCode(200)
  async getCategoriesTree(
    @Query() { langCode, parentId }: GetCategoriesQuery,
  ): Promise<MasterCategoryNode[]> {
    return this.categoryService.getCategoryTree(langCode, parentId);
  }

  @Get("categories-parent-ids")
  @ApiOperation({ summary: "Get regions with their translations" })
  @ApiResponse({
    status: 200,
    description: "Categories",
    type: CategoryTranslation,
  })
  @HttpCode(200)
  async getParentCategoryIds(
    @Query("categoryId") categoryId: number,
  ): Promise<number[]> {
    return this.categoryService.getParentCategoryIds(categoryId);
  }
}
