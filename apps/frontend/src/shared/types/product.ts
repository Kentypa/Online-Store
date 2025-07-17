import { ProductStats } from "./product-stats";

export type Product = {
  id: number;
  price: number;
  currency: string;
  stock: number;
  main_image_url: string;
  other_image_urls: string[];
  category_id: number;
  stats: ProductStats[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: Date;
};
