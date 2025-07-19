import { ServiceNames } from "@enums/serviceNames";
import { GetProductsDto, productsService } from "@services/productsService";
import { ProductTranslation } from "@shared-types/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (dto: GetProductsDto) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, isFetched, ...otherOptions } = useQuery({
    queryKey: [dto],
    queryFn: ({ queryKey }) => {
      const [dto] = queryKey;
      return getProducts(dto);
    },
  });

  const productData: ProductTranslation = data?.data.data[0];
  const productImages = isFetched
    ? [
        productData.product.main_image_url,
        ...productData.product.other_image_urls,
      ]
    : undefined;

  return { productData, productImages, ...otherOptions };
};
