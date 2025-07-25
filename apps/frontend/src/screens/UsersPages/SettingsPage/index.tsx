import { useProfileNavigation } from "@hooks/user/use-profile-navigation";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { ProfileNavigation } from "@layout/ProfileNavigation";
import { FC, useMemo } from "react";
import { useForm } from "@hooks/form/use-form";
import { useUserAvatarChange } from "@features/UsersPages/SettingsPage/hooks/use-user-avatar-change";
import { useTranslation } from "react-i18next";
import { useUpdateUser } from "@hooks/user/use-update-user";
import { useAppSelector } from "@hooks/core/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useDeleteAccount } from "@features/UsersPages/SettingsPage/hooks/use-delete-account";
import { useEditProfilePopups } from "@features/UsersPages/SettingsPage/hooks/use-edit-page-popups";
import { DeleteAccountModal } from "@features/UsersPages/SettingsPage/components/modals/DeleteAccountModal";
import { useLogout } from "@features/UsersPages/SettingsPage/hooks/use-logout";
import { useChangePassword } from "@features/UsersPages/SettingsPage/hooks/use-change-password";
import { ChangePasswordModal } from "@features/UsersPages/SettingsPage/components/modals/ChangePasswordModal";
import { ProfileForm } from "@shared-types/formData/profile-form";
import { useIsNotSubmitable } from "@hooks/form/use-is-not-submitable";
import { useEditableFields } from "@hooks/form/use-editable-fields";
import { UserSettingsForm } from "@features/UsersPages/SettingsPage/components/forms/UserSettingsForm";
import { useFormHandlers } from "@features/UsersPages/SettingsPage/hooks/use-form-handlers";
import { useLocationData } from "@features/UsersPages/SettingsPage/hooks/use-location-data";

export const UserSettingsPage: FC = () => {
  const profileNavigation = useProfileNavigation();
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    city,
    country,
    region,
  } = useAppSelector(userSelector);

  const initialState = useMemo(
    () => ({
      email,
      firstName,
      lastName,
      phoneNumber,
      avatar: undefined,
      countryCode: country?.code,
      regionId: region?.id,
      cityId: city?.id,
    }),
    [
      city?.id,
      country?.code,
      email,
      firstName,
      lastName,
      phoneNumber,
      region?.id,
    ],
  );

  const {
    handleUpdatedUser,
    isSuccess: userUpdateIsSuccess,
    isError: userUpdateIsError,
  } = useUpdateUser(initialState);

  const { formState, handleChangeByValue, handleSubmit } = useForm<ProfileForm>(
    initialState,
    handleUpdatedUser,
  );

  const {
    avatarPreview,
    handleAvatarChange,
    isError: avatarLoadingError,
    errorCount: avatarUploadsErrorCounter,
  } = useUserAvatarChange(handleChangeByValue, avatarUrl);

  const { t } = useTranslation("user-settings");
  const { editFields, toggleEdit } = useEditableFields({ email: false });

  const { cities, countries, regions } = useLocationData(
    formState.countryCode,
    formState.regionId,
  );

  const { handleInputChange, handleLocationChange } =
    useFormHandlers(handleChangeByValue);

  const saveChangesIsNotSubmitable = useIsNotSubmitable({
    initialState,
    state: formState,
  });

  const {
    formState: deleteAccountFormState,
    handleChange: deleteAccountHandleChange,
    handleSubmit: deleteAccountHandleSubmit,
    isError: deleteAccountIsError,
    toggleShowDeleteAccountModal,
    showDeleteAccountModal,
  } = useDeleteAccount();

  const {
    formState: changePasswordFormState,
    handleChange: changePasswordHandleChange,
    handleSubmit: changePasswordHandleSubmit,
    toggleShowChangePasswordModal,
    showChangePasswordModal,
  } = useChangePassword();

  const { mutate: logoutMutate } = useLogout();

  useEditProfilePopups({
    userUpdateIsSuccess,
    userUpdateIsError,
    avatarLoadingError,
    avatarUploadsErrorCounter,
    deleteAccountIsError,
  });

  return (
    <MainContentWrapper>
      <DeleteAccountModal
        toggleModal={toggleShowDeleteAccountModal}
        visible={showDeleteAccountModal}
        formState={deleteAccountFormState}
        handleChange={deleteAccountHandleChange}
        handleSubmit={deleteAccountHandleSubmit}
      />
      <ChangePasswordModal
        toggleModal={toggleShowChangePasswordModal}
        visible={showChangePasswordModal}
        formState={changePasswordFormState}
        handleChange={changePasswordHandleChange}
        handleSubmit={changePasswordHandleSubmit}
      />
      <div className="flex justify-between max-w-444 max-h-192 size-full my-18">
        <ProfileNavigation {...profileNavigation} />
        <UserSettingsForm
          avatarPreview={avatarPreview}
          editFields={editFields}
          formState={formState}
          handleAvatarChange={handleAvatarChange}
          handleChange={handleInputChange}
          handleLocationChange={handleLocationChange}
          handleSubmit={handleSubmit}
          logoutMutate={logoutMutate}
          saveChangesIsNotSubmitable={saveChangesIsNotSubmitable}
          t={t}
          toggleEdit={toggleEdit}
          toggleShowChangePasswordModal={toggleShowChangePasswordModal}
          toggleShowDeleteAccountModal={toggleShowDeleteAccountModal}
          citiesData={cities}
          regionsData={regions}
          countriesData={countries}
        />
      </div>
    </MainContentWrapper>
  );
};
