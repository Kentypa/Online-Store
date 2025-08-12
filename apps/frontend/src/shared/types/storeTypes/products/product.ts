import { ProductStats } from "./product-stats";
import { Review } from "./review";

export type Product = {
  id: number;
  price: number;
  currency: string;
  stock: number;
  mainImageUrl: string;
  otherImageUrls: string[];
  categoryId: number;
  stats: ProductStats[];
  reviews: Review[];
};
