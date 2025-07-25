import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/user-service";
import { UserData } from "@shared-types/auth/user-data";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: number) => {
  const { getUserById } = userService(ServiceNames.USER);

  const { ...otherOptions } = useQuery<UserData>({
    queryKey: [Queries.USER, userId],
    queryFn: () => getUserById(userId),
  });

  return { ...otherOptions };
};
