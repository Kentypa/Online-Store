import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/user-service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useRecoveryAccount = () => {
  const { recoveryUser } = userService(ServiceNames.USER);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: recoveryUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  return { ...options };
};
