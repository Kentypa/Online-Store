import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CategoryService } from "../services/category.service";
import { CategoryTranslation } from "../entities/category-translation.entity";
import { MasterCategoryNode } from "../types/master-category-node.type";

@ApiBearerAuth()
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
    @Query("langCode") langCode?: string,
    @Query("parentId") parentId?: number,
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
    @Query("langCode") langCode?: string,
    @Query("parentId") parentId?: number,
  ): Promise<MasterCategoryNode[]> {
    return this.categoryService.getCategoryTree(langCode, parentId);
  }
}
