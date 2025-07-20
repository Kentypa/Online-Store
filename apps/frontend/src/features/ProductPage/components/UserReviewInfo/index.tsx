import { FC } from "react";
import EmptyAvatar from "@icons/user-avatar.svg?react";
import { useUser } from "@hooks/use-user";

type UserReviewInfoProps = {
  userId: number;
};

export const UserReviewInfo: FC<UserReviewInfoProps> = ({ userId }) => {
  const { userData } = useUser(userId);

  return (
    <div className="flex gap-4">
      {userData && userData.avatarUrl !== null ? (
        <img
          src={`http://localhost:3000${userData.avatarUrl}`}
          className="rounded-full size-6 object-cover"
        />
      ) : (
        <EmptyAvatar className="fill-primary size-6" />
      )}
      {userData && <p>{userData.firstName}</p>}
    </div>
  );
};
