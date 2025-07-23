import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { cartService } from "@services/cartService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  const { removeFromCart } = cartService(ServiceNames.CART);

  const { ...options } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.USER],
      });
    },
  });

  return {
    ...options,
  };
};
