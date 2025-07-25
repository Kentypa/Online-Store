import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { authService } from "@services/auth-service";
import {
  changeIsAuthenticated,
  changeAuthLoading,
} from "@stores/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "@hooks/core/redux";

export const useUserVerify = (enabled: boolean = true) => {
  const dispatch = useAppDispatch();
  const { validateUser } = authService(ServiceNames.AUTH);

  const { isSuccess, isError, ...otherOptions } = useQuery({
    queryKey: [Queries.AUTH],
    queryFn: validateUser,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(changeIsAuthenticated(true));
      dispatch(changeAuthLoading(false));
    }

    if (isError) {
      dispatch(changeIsAuthenticated(false));
      dispatch(changeAuthLoading(false));
    }
  }, [dispatch, isError, isSuccess]);

  return { isSuccess, isError, ...otherOptions };
};
