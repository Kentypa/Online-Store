import api from "@config/axios";
import { GetProductsDto } from "@shared-types/storeTypes/products/dto/get-products-dto";
import { GetProductsWithTotal } from "@shared-types/storeTypes/products/dto/get-products-with-total.dto";
import { apiErrorHandler } from "@utils/api-error-handler";

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
    return apiErrorHandler(() =>
      api.get<GetProductsWithTotal>(`${url}`, {
        params: {
          langCode,
          ids: productsId,
          offset,
          limit,
          regionId,
          sortBy,
          categoryId,
          withReviews,
          query,
        },
      })
    );
  };

  return { getProducts };
}
