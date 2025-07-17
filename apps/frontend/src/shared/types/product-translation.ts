import { Product } from "./product";

export type ProductTranslation = {
  product_id: number;
  lang: string;
  product: Product;
  title: string;
  description: string;
};
