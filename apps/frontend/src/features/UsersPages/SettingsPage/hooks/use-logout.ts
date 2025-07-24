import { PagesEndponts } from "@enums/pagesEndpoints";
import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { useAppDispatch } from "@hooks/core/redux";
import { authService } from "@services/authService";
import { logout } from "@stores/user/userSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { logoutUser } = authService(ServiceNames.AUTH);

  const { mutate, isSuccess, ...otherOptions } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());

      queryClient.removeQueries({ queryKey: [Queries.AUTH] });
      queryClient.removeQueries({ queryKey: [Queries.USER] });

      navigate(PagesEndponts.SIGN_IN);
    },
  });

  return { mutate, isSuccess, ...otherOptions };
};
