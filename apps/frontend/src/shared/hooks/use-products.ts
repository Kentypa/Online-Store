import { ServiceNames } from "@enums/serviceNames";
import { GetProductsDto, productsService } from "@services/productsService";
import { ProductTranslation } from "@shared-types/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (dto: GetProductsDto) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, ...otherOptions } = useQuery({
    queryKey: [dto],
    queryFn: ({ queryKey }) => {
      const [dto] = queryKey;
      return getProducts(dto);
    },
  });

  const productsData: ProductTranslation[] = data?.data.data;
  const total: number = data?.data.total;

  return { productsData, total, ...otherOptions };
};
