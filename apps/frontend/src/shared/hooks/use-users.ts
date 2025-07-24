import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { UserData } from "@shared-types/auth/user-data";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (userIds: number[]) => {
  const { getUsersByIds } = userService(ServiceNames.USER);

  const { ...otherOptions } = useQuery<UserData[]>({
    queryKey: [Queries.USER, userIds],
    queryFn: () => getUsersByIds(userIds),
    enabled: userIds.length > 0,
  });

  return { ...otherOptions };
};
