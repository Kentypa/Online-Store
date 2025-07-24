import { SortProductsBy } from "@enums/sortProductsBy";

export type GetProductsDto = {
  langCode?: string;
  productsId?: number[];
  offset?: number;
  limit?: number;
  regionId?: number;
  sortBy?: SortProductsBy;
  categoryId?: number;
  withReviews?: boolean;
  query?: string;
};
