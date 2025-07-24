import { ProductTranslation } from "../product-translation";

export type GetProductsWithTotal = {
  data: ProductTranslation[];
  total: number;
};
