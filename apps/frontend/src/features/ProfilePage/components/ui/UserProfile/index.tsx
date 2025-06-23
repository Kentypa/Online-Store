import { useAppSelector } from "@hooks/redux";
import { userSelector } from "@selectors/userSelector";
import { useProfileFeatures } from "@features/ProfilePage/hooks/use-profile-features";
import { FC } from "react";
import { EditProfileButton } from "../EditProfileButton";
import { UserAchievements } from "../UserAchievements";
import { UserInfo } from "../UserInfo";

export const UserProfile: FC = () => {
  const userInfo = useAppSelector(userSelector);
  const userStatistic = useProfileFeatures();

  return (
    <main className="flex justify-center px-30 pb-30 mt-10 w-full">
      <div className="flex flex-col max-w-[1200px] w-full relative">
        <UserInfo
          userCoinsInfo={userStatistic}
          className="mb-10"
          name={userInfo.email}
          avatar={userInfo.avatarUrl}
        />
        <EditProfileButton className="absolute right-0" />
        {userInfo.achievements && (
          <UserAchievements achievements={userInfo.achievements} />
        )}
      </div>
    </main>
  );
};
