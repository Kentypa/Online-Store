import { useState, useEffect } from "react";
import { useUpdateQuantity } from "@features/UsersPages/CartPage/hooks/use-update-quantity";
import { CartItem } from "@shared-types/storeTypes/cart/cart";

export const useCartQuantities = (cart?: CartItem[]) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { mutate: updateQuantityMutate } = useUpdateQuantity();

  useEffect(() => {
    if (cart) {
      const initialQuantities = Object.fromEntries(
        cart.map((item) => [item.productId, item.quantity])
      );
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
    updateQuantityMutate({ productId, newQuantity: value });
  };

  return { quantities, handleQuantityChange };
};
