import { MainContentWrapper } from "@layout/MainContentWrapper";
import { UserProfile } from "@features/ProfilePage/components/ui/UserProfile";
import { FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <MainContentWrapper>
      <UserProfile />
    </MainContentWrapper>
  );
};
