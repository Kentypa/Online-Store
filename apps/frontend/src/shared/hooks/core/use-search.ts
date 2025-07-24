import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { productsService } from "@services/productsService";
import { GetProductsWithTotal } from "@shared-types/storeTypes/products/dto/get-products-with-total.dto";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useSearch = (query: string, offset?: number, limit?: number) => {
  const { i18n } = useTranslation();

  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, ...otherOptions } = useQuery<GetProductsWithTotal>({
    queryKey: [Queries.SEARCH_PRODUCTS, query, i18n.language, offset, limit],
    queryFn: () =>
      getProducts({ query, langCode: i18n.language, offset, limit }),
  });

  const products = data?.data ?? [];

  return { products, ...otherOptions };
};
