import { useAddToCart } from "@hooks/store/use-add-to-cart";
import { useAppSelector } from "@hooks/core/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useMemo } from "react";
import { useAddToCartPopups } from "@features/StorePages/ProductPage/hooks/use-add-to-cart-popups";

export const useProductCart = (productId: number) => {
  const { cart } = useAppSelector(userSelector);
  const {
    mutate,
    isSuccess: addingToCartIsSuccess,
    isError: addingToCartError,
  } = useAddToCart();

  useAddToCartPopups({
    addingToCartError,
    addingToCartIsSuccess,
    productName: "",
  });

  const isAlreadyInCart = useMemo(
    () =>
      cart?.some(
        (cartItem) => cartItem.product_id === productId || addingToCartIsSuccess
      ),
    [cart, productId, addingToCartIsSuccess]
  );

  const addToCart = () => mutate({ productId });

  return {
    isAlreadyInCart,
    addToCart,
  };
};
