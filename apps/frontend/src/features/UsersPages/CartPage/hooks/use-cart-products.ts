import { useAppSelector } from "@hooks/core/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useProducts } from "@hooks/store/use-products";
import { useTranslation } from "react-i18next";

export const useCartProducts = () => {
  const { i18n } = useTranslation("user-cart");
  const { cart } = useAppSelector(userSelector);

  const cartProductsIds = cart?.map((item) => item.productId) || [];
  const shouldFetchProducts = cartProductsIds.length > 0;

  const { productsData } = useProducts(
    {
      productsId: cartProductsIds,
      langCode: i18n.language,
    },
    shouldFetchProducts
  );

  return {
    cart,
    productsData,
    isEmpty: cartProductsIds.length === 0,
  };
};
