import api from "@config/axios";
import { SortProductsBy } from "@enums/sortProductsBy";

export type GetProductsDto = {
  langCode?: string;
  productId?: number;
  offset?: number;
  limit?: number;
  regionId?: number;
  sortBy?: SortProductsBy;
  categoryId?: number;
};

export function productsService(url: string) {
  const getProducts = async ({
    langCode,
    limit,
    offset,
    productId,
    regionId,
    sortBy,
    categoryId,
  }: GetProductsDto) => {
    return api
      .get(url, {
        params: {
          langCode: langCode,
          id: productId,
          offset: offset,
          limit: limit,
          regionId: regionId,
          sortBy: sortBy,
          categoryId: categoryId,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  return { getProducts };
}
