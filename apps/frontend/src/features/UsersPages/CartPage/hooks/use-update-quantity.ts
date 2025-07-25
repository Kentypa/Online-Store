import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { cartService } from "@services/cartService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UpdateQuantity } from "../types/update-quantity";

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const { updateQuantity } = cartService(ServiceNames.CART);

  const { ...options } = useMutation({
    mutationFn: ({ newQuantity, productId }: UpdateQuantity) =>
      updateQuantity(productId, newQuantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.CART],
      });
    },
  });

  return {
    ...options,
  };
};
