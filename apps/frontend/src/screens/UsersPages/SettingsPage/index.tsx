import { useProfileNavigation } from "@hooks/use-profile-navigation";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { ProfileNavigation } from "@layout/ProfileNavigation";
import { ChangeEvent, FC, useMemo } from "react";
import { AvatarUploader } from "@features/UsersPages/SettingsPage/components/ui/AvatarUploader";
import { SaveChangesButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/SaveChangesButton";
import { ChangePasswordButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/ChangePasswordButton";
import { DeleteAccountButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/DeleteAccountButton";
import { LogoutButton } from "@features/UsersPages/SettingsPage/components/ui/buttons/LogoutButton";
import { useForm } from "@hooks/use-form";
import { ProfileForm } from "@shared-types/profile-form";
import { useUserAvatarChange } from "@features/UsersPages/SettingsPage/hooks/use-user-avatar-change";
import { EditableSettingsInput } from "@features/UsersPages/SettingsPage/EditableSettingsInput";
import { useTranslation } from "react-i18next";
import { useEditableFields } from "@hooks/use-editable-fields";
import { Form } from "@forms/Form";
import { Option } from "@forms/Option";
import { Select } from "@forms/Select";
import { useCountries } from "@features/UsersPages/SettingsPage/hooks/useCountries";
import { useRegions } from "@features/UsersPages/SettingsPage/hooks/useRegions";
import { useCities } from "@features/UsersPages/SettingsPage/hooks/useCities";
import { useUpdateUser } from "@hooks/use-update-user";
import { useAppSelector } from "@hooks/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useDeleteAccount } from "@features/UsersPages/SettingsPage/hooks/use-delete-account";
import { useEditProfilePopups } from "@features/UsersPages/SettingsPage/hooks/use-edit-page-popups";
import { DeleteAccountModal } from "@features/UsersPages/SettingsPage/components/modals/DeleteAccountModal";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useLogout } from "@features/UsersPages/SettingsPage/hooks/use-logout";
import { useChangePassword } from "@features/UsersPages/SettingsPage/hooks/use-change-password";
import { ChangePasswordModal } from "@features/UsersPages/SettingsPage/components/modals/ChangePasswordModal";

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
    ]
  );

  const {
    handleUpdatedUser,
    isSuccess: userUpdateIsSuccess,
    isError: userUpdateIsError,
  } = useUpdateUser(initialState);
  const { formState, handleChange, handleChangeByValue, handleSubmit } =
    useForm<ProfileForm>(initialState, handleUpdatedUser);
  const {
    avatarPreview,
    handleAvatarChange,
    isError: avatarLoadingError,
    errorCount: avatarUploadsErrorCounter,
  } = useUserAvatarChange(handleChangeByValue, avatarUrl);

  const { t } = useTranslation("user-settings");
  const { editFields, toggleEdit } = useEditableFields({ email: false });

  const { countriesData, isSuccess: isCountriesFetchedSuccess } =
    useCountries();

  const { regionsData, isSuccess: isRegionsFetchedSuccess } = useRegions(
    isCountriesFetchedSuccess,
    formState.countryCode ?? ""
  );

  const { citiesData } = useCities(isRegionsFetchedSuccess, formState.regionId);

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "countryCode") {
      handleChangeByValue("countryCode", value);
      handleChangeByValue("regionId", "");
      handleChangeByValue("cityId", "");
    } else if (name === "regionId") {
      handleChangeByValue("regionId", value);
      handleChangeByValue("cityId", "");
    } else if (name === "cityId") {
      handleChangeByValue("cityId", value);
    }
  };

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
        <Form
          handleSubmit={handleSubmit}
          className="p-10 border-2 gap-46 border-separator rounded-4xl flex flex-col size-full max-w-339 max-h-192"
        >
          <div className="flex justify-between">
            <div className="flex flex-col max-w-150 max-h-90 size-full gap-6">
              <EditableSettingsInput
                label={t("inputs.userEmail")}
                name="email"
                isEdited={editFields["email"]}
                toggleEdit={() => toggleEdit("email")}
                value={formState.email}
                handleChange={handleChange}
              />
              <EditableSettingsInput
                label={t("inputs.userFirstName")}
                name="firstName"
                isEdited={editFields["firstName"]}
                toggleEdit={() => toggleEdit("firstName")}
                value={formState.firstName}
                handleChange={handleChange}
              />
              <EditableSettingsInput
                label={t("inputs.userLastName")}
                name="lastName"
                isEdited={editFields["lastName"]}
                toggleEdit={() => toggleEdit("lastName")}
                value={formState.lastName}
                handleChange={handleChange}
              />
              <EditableSettingsInput
                label={t("inputs.userPhoneNumber")}
                name="phoneNumber"
                isEdited={editFields["phoneNumber"]}
                toggleEdit={() => toggleEdit("phoneNumber")}
                value={formState.phoneNumber}
                handleChange={handleChange}
              />

              <Select
                handleChange={handleLocationChange}
                name="countryCode"
                id="countryCode"
                className="appearance-none"
                value={formState.countryCode}
              >
                <Option value="">Please choose country</Option>
                {countriesData &&
                  countriesData.map((country) => (
                    <Option
                      key={country.country_code}
                      value={country.country_code}
                    >
                      {country.name}
                    </Option>
                  ))}
              </Select>

              {formState.countryCode && (
                <Select
                  handleChange={handleLocationChange}
                  name="regionId"
                  id="regionId"
                  className="appearance-none"
                  value={formState.regionId}
                >
                  <Option value="">Please choose region</Option>
                  {regionsData &&
                    regionsData.map((region) => (
                      <Option key={region.region_id} value={region.region_id}>
                        {region.name}
                      </Option>
                    ))}
                </Select>
              )}

              {formState.regionId && (
                <Select
                  handleChange={handleLocationChange}
                  name="cityId"
                  id="cityId"
                  className="appearance-none"
                  value={formState.cityId}
                >
                  <Option value="">Please choose city</Option>
                  {citiesData &&
                    citiesData.map((city) => (
                      <Option key={city.city_id} value={city.city_id}>
                        {city.name}
                      </Option>
                    ))}
                </Select>
              )}
            </div>
            <AvatarUploader
              handleChange={handleAvatarChange}
              avatarPreview={avatarPreview}
            />
          </div>
          <div className="flex justify-between">
            <SaveChangesButton
              type="submit"
              disabled={saveChangesIsNotSubmitable}
            />

            <div className="flex flex-col gap-6 max-w-62.5 w-full">
              <ChangePasswordButton
                type="button"
                handleClick={toggleShowChangePasswordModal}
              />
              <LogoutButton handleClick={logoutMutate} />
              <DeleteAccountButton
                type="button"
                handleClick={toggleShowDeleteAccountModal}
              />
            </div>
          </div>
        </Form>
      </div>
    </MainContentWrapper>
  );
};
