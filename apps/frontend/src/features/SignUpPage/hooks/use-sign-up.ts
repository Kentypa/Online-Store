import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { authService } from "@services/authService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const { signUpUser } = authService(ServiceNames.AUTH);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  return { ...options };
};
