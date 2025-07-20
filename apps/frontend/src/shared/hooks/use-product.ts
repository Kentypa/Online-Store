import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { calculateAvarageRating } from "@features/ProductPage/utils/calculate-avarage-rating";
import { GetProductsDto, productsService } from "@services/productsService";
import { ProductTranslation } from "@shared-types/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (dto: GetProductsDto) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, isFetched, ...otherOptions } = useQuery({
    queryKey: [Queries.PRODUCT, dto.productId],
    queryFn: () => getProducts(dto),
  });

  const productData: ProductTranslation = data?.data.data[0];
  const productImages = isFetched
    ? [
        productData.product.main_image_url,
        ...productData.product.other_image_urls,
      ]
    : undefined;

  const productAvarageRating = isFetched
    ? calculateAvarageRating(productData.product.reviews)
    : undefined;

  const productReviewsCount = isFetched
    ? productData.product.reviews.length
    : undefined;

  return {
    productData,
    productImages,
    productAvarageRating,
    productReviewsCount,
    ...otherOptions,
  };
};
