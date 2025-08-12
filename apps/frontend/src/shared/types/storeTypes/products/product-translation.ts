import { Product } from "./product";

export type ProductTranslation = {
  productId: number;
  lang: string;
  product: Product;
  title: string;
  description: string;
};
