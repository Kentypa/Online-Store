import { FC } from "react";
import EmptyAvatar from "@icons/user-avatar.svg?react";
import { BACKEND_URL } from "@config/config";

type UserReviewInfoProps = {
  avatarUrl: string | null;
  firstName?: string;
  email?: string;
};

export const UserReviewInfo: FC<UserReviewInfoProps> = ({
  avatarUrl,
  email,
  firstName,
}) => {
  return (
    <div className="flex gap-4">
      {avatarUrl !== null ? (
        <img
          src={`${BACKEND_URL}/${avatarUrl}`}
          className="rounded-full size-6 object-cover"
        />
      ) : (
        <EmptyAvatar className="fill-primary size-6" />
      )}
      <p>{firstName ?? email}</p>
    </div>
  );
};
