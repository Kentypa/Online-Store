import { useProduct } from "@hooks/store/use-product";
import { useTranslation } from "react-i18next";

export const useProductData = (productId: number) => {
  const { i18n } = useTranslation("product");

  return useProduct({
    langCode: i18n.language,
    productsId: [productId],
    withReviews: true,
  });
};
