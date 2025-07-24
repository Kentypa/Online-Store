import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { calculateAvarageRating } from "@features/ProductPage/utils/calculate-avarage-rating";
import { productsService } from "@services/productsService";
import { GetProductsDto } from "@shared-types/storeTypes/products/dto/get-products-dto";
import { GetProductsWithTotal } from "@shared-types/storeTypes/products/dto/get-products-with-total.dto";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (dto: GetProductsDto) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, ...otherOptions } = useQuery<GetProductsWithTotal>({
    queryKey: [Queries.PRODUCT, dto.productsId],
    queryFn: () => getProducts(dto),
  });

  const productData: ProductTranslation | undefined = data?.data[0];
  const productImages = productData && [
    productData.product.main_image_url,
    ...productData.product.other_image_urls,
  ];

  const productAvarageRating =
    productData && calculateAvarageRating(productData.product.reviews);

  const productReviewsCount = productData && productData.product.reviews.length;

  return {
    productData,
    productImages,
    productAvarageRating,
    productReviewsCount,
    ...otherOptions,
  };
};
