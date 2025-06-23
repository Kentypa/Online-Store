import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { authService } from "@services/authService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  const { signInUser } = authService(ServiceNames.AUTH);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  return { ...options };
};
