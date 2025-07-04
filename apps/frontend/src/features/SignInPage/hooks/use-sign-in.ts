import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { authService } from "@services/authService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SignInDto } from "../types/sign-in-dto";

export const useSignIn = () => {
  const { signInUser } = authService(ServiceNames.AUTH);

  const queryClient = useQueryClient();

  const { ...options } = useMutation<unknown, AxiosError, SignInDto>({
    mutationFn: signInUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.AUTH] });
    },
  });

  const isForbiddenError = options.error?.response?.status == 403;
  return { ...options, isForbiddenError };
};
