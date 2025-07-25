import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/user-service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ResetPasswordDto } from "../dto/reset-password-dto";

export const useResetPassword = () => {
  const { resetPassword } = userService(ServiceNames.USER);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: (resetPasswordDto: ResetPasswordDto) =>
      resetPassword(resetPasswordDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  return { ...options };
};
