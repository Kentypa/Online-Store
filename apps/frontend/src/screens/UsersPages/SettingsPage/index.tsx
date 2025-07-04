import { useProfileNavigation } from "@hooks/use-profile-navigation";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { ProfileNavigation } from "@layout/ProfileNavigation";
import { FC } from "react";
import { EditableSettings } from "@features/UsersPages/SettingsPage/EditableSettings";
import { useEditableSettings } from "@features/UsersPages/SettingsPage/hooks/useEditableSettings";
import { AvatarUploader } from "@features/UsersPages/SettingsPage/components/ui/AvatarUploader";
import { SaveChangesButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/SaveChangesButton";
import { ChangePasswordButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/ChangePasswordButton";
import { DeleteAccountButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/DeleteAccountButton";
import { LogoutButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/LogoutButton";

export const UserSettingsPage: FC = () => {
  const profileNavigation = useProfileNavigation();
  const editableSettings = useEditableSettings();

  return (
    <MainContentWrapper>
      <div className="flex justify-between max-w-444 max-h-192 size-full my-18">
        <ProfileNavigation {...profileNavigation} />
        <div className="p-10 border-2 gap-46 border-separator rounded-4xl flex flex-col size-full max-w-339 max-h-192">
          <div className="flex justify-between">
            <EditableSettings editableSettings={editableSettings} />
            <AvatarUploader />
          </div>
          <div className="flex justify-between">
            <SaveChangesButton />

            <div className="flex flex-col gap-6 max-w-62.5 w-full">
              <ChangePasswordButton />
              <LogoutButton />
              <DeleteAccountButton />
            </div>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};
