import { Test, TestingModule } from "@nestjs/testing";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

describe("CategoryController", () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryService = {
    getCategories: jest
      .fn()
      .mockResolvedValue({ langCode: "en", parentId: null }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it("should return all categories", async () => {
    const result = await categoryController.getCategories({});

    expect(result).toEqual({ langCode: "en", parentId: null });
    expect(mockCategoryService.getCategories).toHaveBeenCalled();
  });

  it("should be defined", () => {
    expect(categoryService).toBeDefined();
  });

  it("should handle controller errors", async () => {
    const error = new Error("Database error");

    mockCategoryService.getCategories.mockRejectedValue(error);

    await expect(categoryController.getCategories({})).rejects.toThrow(
      "Database error",
    );

    expect(mockCategoryService.getCategories).toHaveBeenCalled();
  });
});
