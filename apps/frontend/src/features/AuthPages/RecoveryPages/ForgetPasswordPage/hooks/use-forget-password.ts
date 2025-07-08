import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useForgetPassword = () => {
  const { requestResetPasswordUser } = userService(ServiceNames.USER);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: requestResetPasswordUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  return { ...options };
};
