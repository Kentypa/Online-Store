import api from "@config/axios";
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

export function productsService(url: string) {
  const getProducts = async ({
    langCode,
    limit,
    offset,
    productsId,
    regionId,
    sortBy,
    categoryId,
    withReviews,
    query,
  }: GetProductsDto) => {
    return api
      .get(url, {
        params: {
          langCode: langCode,
          ids: productsId,
          offset: offset,
          limit: limit,
          regionId: regionId,
          sortBy: sortBy,
          categoryId: categoryId,
          withReviews: withReviews,
          query: query,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  return { getProducts };
}
