import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mockProductsService = {
    getProducts: jest.fn().mockResolvedValue({ data: ["product1"], total: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it("should return all products", async () => {
    const result = await productsController.getProducts({});

    expect(result).toEqual({ data: ["product1"], total: 1 });
    expect(mockProductsService.getProducts).toHaveBeenCalled();
  });

  it("should be defined", () => {
    expect(productsService).toBeDefined();
  });

  it("should handle controller errors", async () => {
    const error = new Error("Database error");

    mockProductsService.getProducts.mockRejectedValue(error);

    await expect(productsController.getProducts({})).rejects.toThrow(
      "Database error",
    );

    expect(mockProductsService.getProducts).toHaveBeenCalled();
  });
});
