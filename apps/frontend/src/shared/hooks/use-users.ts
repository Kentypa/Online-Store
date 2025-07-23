import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { UserData } from "@shared-types/user-data";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (userIds: number[]) => {
  const { getUsersByIds } = userService(ServiceNames.USER);

  const { data, isFetched, ...otherOptions } = useQuery({
    queryKey: [Queries.USER, userIds],
    queryFn: () => getUsersByIds(userIds),
  });

  const usersData: UserData[] | undefined = isFetched
    ? (data?.data as UserData[])
    : undefined;

  return { usersData, ...otherOptions };
};
