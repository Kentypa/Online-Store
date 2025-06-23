import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { changeByData } from "@stores/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "@hooks/redux";

export const useUserData = (enabled: boolean = true) => {
  const { getUser } = userService(ServiceNames.USER);
  const dispatch = useAppDispatch();

  const { data, isSuccess, ...otherOptions } = useQuery({
    queryKey: [Queries.USER],
    queryFn: getUser,
    enabled,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(changeByData(data.data));
    }
  }, [data, dispatch, isSuccess]);

  return { data, isSuccess, ...otherOptions };
};
