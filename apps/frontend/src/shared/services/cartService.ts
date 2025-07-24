import api from "@config/axios";
import { AddToCartDto } from "@shared-types/storeTypes/cart/dto/add-to-cart-dto";
import { apiErrorHandler } from "@utils/apiErrorHandler";

export function cartService(url: string) {
  const addToCart = async ({ productId }: AddToCartDto) => {
    return apiErrorHandler(() => api.post(`${url}/items`, { productId }));
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    return apiErrorHandler(() =>
      api.patch(`${url}/items/${productId}`, {
        quantity: newQuantity,
      }),
    );
  };

  const removeFromCart = async (productId: number) => {
    return apiErrorHandler(() => api.delete(`${url}/items/${productId}`));
  };

  return { addToCart, updateQuantity, removeFromCart };
}
