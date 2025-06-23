import { FeatureItem } from "@shared-types/feature-item";
import { Title } from "@ui/Title";
import { UserStats } from "@features/HomePage/components/business/UserStats";
import { FC } from "react";
import undefinedAvatar from "@icons/user-dark.svg";

type UserInfoProps = {
  userCoinsInfo: FeatureItem[];
  className?: string;
  name: string;
  avatar?: string;
};

export const UserInfo: FC<UserInfoProps> = ({
  className,
  name,
  userCoinsInfo,
  avatar,
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <img
        src={avatar || undefinedAvatar}
        alt={"user-logo"}
        className="size-40 rounded-full object-cover"
      />
      <div className="flex flex-col max-w-[1016px] w-full">
        <Title className="text-headline-small mb-6">{name}</Title>
        <UserStats
          userStats={userCoinsInfo}
          className="max-w-[608px] gap-x-0.25"
          itemClassName="py-4 px-6"
        />
      </div>
    </div>
  );
};
