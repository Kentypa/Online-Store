import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { calculateAvarageRating } from "@features/StorePages/ProductPage/utils/calculate-avarage-rating";
import { productsService } from "@services/products-service";
import { GetProductsDto } from "@shared-types/storeTypes/products/dto/get-products-dto";
import { GetProductsWithTotal } from "@shared-types/storeTypes/products/dto/get-products-with-total.dto";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (dto: GetProductsDto) => {
  const { getProducts } = productsService(ServiceNames.PRODUCTS);

  const { data, ...otherOptions } = useQuery<GetProductsWithTotal>({
    queryKey: [Queries.PRODUCT, dto],
    queryFn: () => getProducts(dto),
  });

  const productData: ProductTranslation | undefined = data?.data[0];
  const productImages = productData && [
    productData.product.mainImageUrl,
    ...productData.product.otherImageUrls,
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
