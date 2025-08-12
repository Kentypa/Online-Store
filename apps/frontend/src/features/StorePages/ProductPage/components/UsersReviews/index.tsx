import { FC, useMemo } from "react";
import { useUsers } from "@hooks/user/use-users";
import { UserReviewInfo } from "../UserReviewInfo";
import { Review } from "@shared-types/storeTypes/products/review";
import { Stars } from "@ui/Stars";

type UsersReviewsProps = {
  reviews: Review[];
  showAllReviews: boolean;
  productReviewsCount: number;
};

export const UsersReviews: FC<UsersReviewsProps> = ({
  reviews,
  showAllReviews,
  productReviewsCount,
}) => {
  const userIds = useMemo(() => reviews.map((r) => r.userId), [reviews]);
  const { data: usersData } = useUsers(userIds);

  const usersById = useMemo(() => {
    if (!usersData) return {};
    return usersData.reduce<Record<number, (typeof usersData)[number]>>(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {}
    );
  }, [usersData]);

  return reviews
    .slice(0, showAllReviews ? productReviewsCount : 3)
    .map((review) => {
      const user = usersById[review.userId];

      return (
        <li
          key={review.id}
          className="rounded-4xl border-2 border-separator p-6 flex w-full"
        >
          <div className="flex flex-col gap-2">
            {user && (
              <UserReviewInfo
                avatarUrl={user.avatarUrl ?? null}
                email={user.email}
                firstName={user.firstName}
              />
            )}
            <Stars
              gap={6}
              rating={review.rating ?? 0}
              starSize={12}
              className="fill-primary flex"
            />
            <p className="text-body-small max-h-15">{review.comment}</p>
          </div>
        </li>
      );
    });
};
