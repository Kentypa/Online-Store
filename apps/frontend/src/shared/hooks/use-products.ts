import { ServiceNames } from "@enums/serviceNames";
import { productsService } from "@services/productsService";
import { GetProductsDto } from "@shared-types/storeTypes/products/dto/get-products-dto";
import { GetProductsWithTotal } from "@shared-types/storeTypes/products/dto/get-products-with-total.dto";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (dto: GetProductsDto, enabled?: boolean) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, ...otherOptions } = useQuery<GetProductsWithTotal>({
    queryKey: [dto],
    queryFn: () => getProducts(dto),
    enabled,
  });

  const productsData: ProductTranslation[] | undefined = data?.data;
  const total: number = data?.total ?? 0;

  return { productsData, total, ...otherOptions };
};
