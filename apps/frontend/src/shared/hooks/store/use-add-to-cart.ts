import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { cartService } from "@services/cartService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddToCart = () => {
  const { addToCart } = cartService(ServiceNames.CART);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.CART] });
    },
  });

  return { ...options };
};
