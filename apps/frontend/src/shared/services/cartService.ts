import api from "@config/axios";

export type AddToCartDto = {
  productId: number;
};

export type UpdateCartItemDto = {
  quantity: number;
};

export function cartService(url: string) {
  const addToCart = async ({ productId }: AddToCartDto) => {
    return await api.post(`${url}/items`, { productId }).catch((error) => {
      console.error(error.toJSON());
      throw new Error(error.message);
    });
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    return await api
      .patch(`${url}/items/${productId}`, {
        quantity: newQuantity,
      })
      .catch((error) => {
        console.error(error.toJSON());
        throw new Error(error.message);
      });
  };

  const removeFromCart = async (productId: number) => {
    return await api.delete(`${url}/items/${productId}`).catch((error) => {
      console.error(error.toJSON());
      throw new Error(error.message);
    });
  };

  return { addToCart, updateQuantity, removeFromCart };
}
