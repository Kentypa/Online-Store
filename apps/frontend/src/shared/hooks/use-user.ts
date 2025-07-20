import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { userService } from "@services/userService";
import { UserData } from "@shared-types/user-data";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: number) => {
  const { getUserById } = userService(ServiceNames.USER);

  const { data, isFetched, ...otherOptions } = useQuery({
    queryKey: [Queries.USER, userId],
    queryFn: () => getUserById(userId),
  });

  const userData: UserData | undefined = isFetched
    ? (data?.data as UserData)
    : undefined;

  return { userData, ...otherOptions };
};
