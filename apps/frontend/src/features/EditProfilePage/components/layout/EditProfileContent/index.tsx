import { EditableField } from "@forms/EditableField";
import { EditablePassword } from "@forms/EditablePassword";
import { useAppSelector } from "@hooks/redux";
import { useEditableFields } from "@hooks/use-editable-fields";
import { useForm } from "@hooks/use-form";
import { useUpdateUser } from "@hooks/use-update-user";
import { ProfileForm } from "@shared-types/profile-form";
import { userSelector } from "@selectors/userSelector";
import { FC, useMemo } from "react";
import { useDeleteAccount } from "@features/EditProfilePage/hooks/use-delete-account";
import { useEditProfilePopups } from "@features/EditProfilePage/hooks/use-edit-page-popups";
import { useLogout } from "@features/EditProfilePage/hooks/use-logout";
import { useUserAvatarChange } from "@features/EditProfilePage/hooks/use-user-avatar-change";
import { DeleteAccountModal } from "../../modals/DeleteAccountModal";
import { AvatarUploader } from "../../ui/AvatarUploader";
import { EditProfileActionButtons } from "../../ui/EditProfileActionButtons";

export const EditProfileContent: FC = () => {
  const { mutate: logoutMutate } = useLogout();

  const { email, username, avatarUrl } = useAppSelector(userSelector);

  const {
    handleUpdatedUser,
    isSuccess: userUpdateIsSuccess,
    isError: userUpdateIsError,
  } = useUpdateUser(email, username);

  const initialState = useMemo(() => ({ email, username }), [email, username]);
  const { formState, handleChangeByValue, handleChange, handleSubmit } =
    useForm<ProfileForm>(initialState, handleUpdatedUser);

  const { editFields, toggleEdit } = useEditableFields({
    email: false,
    username: false,
    password: false,
  });

  const {
    avatarPreview,
    handleAvatarChange,
    isError: avatarLoadingError,
    errorCount: avatarUploadsErrorCounter,
  } = useUserAvatarChange(handleChangeByValue, avatarUrl);

  const {
    formState: deleteAccountFormState,
    handleChange: deleteAccountHandleChange,
    handleSubmit: deleteAccountHandleSubmit,
    isError: deleteAccountIsError,
    toggleShowAccountModal,
    showDeleteAccountModal,
  } = useDeleteAccount();

  useEditProfilePopups({
    userUpdateIsSuccess,
    userUpdateIsError,
    avatarLoadingError,
    avatarUploadsErrorCounter,
    deleteAccountIsError,
  });

  return (
    <main className="my-10 flex w-full justify-center px-30 max-w-[1440px] gap-10">
      <DeleteAccountModal
        toggleModal={toggleShowAccountModal}
        visible={showDeleteAccountModal}
        formState={deleteAccountFormState}
        handleChange={deleteAccountHandleChange}
        handleSubmit={deleteAccountHandleSubmit}
      />
      <form
        className="w-full max-w-200 justify-between items-center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="border border-subtle-light rounded-xl p-3 gap-4 flex flex-col">
          <EditableField
            label="Email"
            name="email"
            value={formState.email}
            isEditing={editFields.email}
            onToggle={() => toggleEdit("email")}
            onChange={handleChange}
          />
          <EditableField
            label="Username"
            name="username"
            value={formState.username}
            isEditing={editFields.username}
            onToggle={() => toggleEdit("username")}
            onChange={handleChange}
          />
          <EditablePassword
            oldPassword={formState.oldPassword}
            newPassword={formState.newPassword}
            isEditing={editFields.password}
            onToggle={() => toggleEdit("password")}
            onChange={handleChange}
          />
          <AvatarUploader
            avatarPreview={avatarPreview}
            onChange={handleAvatarChange}
          />
          <EditProfileActionButtons
            handleLogout={logoutMutate}
            handleDeleteAccount={toggleShowAccountModal}
          />
        </div>
      </form>
    </main>
  );
};
