import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/user-service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useUpdateLanguage = () => {
  const { updateLanguageUser } = userService(ServiceNames.USER);

  const queryClient = useQueryClient();

  const { ...options } = useMutation({
    mutationFn: updateLanguageUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.USER] });
      queryClient.invalidateQueries({ queryKey: [Queries.PRODUCT] });
    },
  });

  return { ...options };
};
