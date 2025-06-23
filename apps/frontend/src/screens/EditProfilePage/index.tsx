import { MainContentWrapper } from "@layout/MainContentWrapper";
import { EditProfileContent } from "@features/EditProfilePage/components/layout/EditProfileContent";
import { FC } from "react";

export const EditProfilePage: FC = () => {
  return (
    <MainContentWrapper>
      <EditProfileContent />
    </MainContentWrapper>
  );
};
