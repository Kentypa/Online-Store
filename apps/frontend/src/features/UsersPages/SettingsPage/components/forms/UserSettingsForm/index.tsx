import { AvatarUploader } from "@features/UsersPages/SettingsPage/components/ui/AvatarUploader";
import { Form } from "@forms/Form";
import { ChangeEvent, FC, FormEvent } from "react";
import { TFunction } from "i18next";
import { CountryTranslation } from "@shared-types/geoTypes/country/country-translation";
import { CityTranslation } from "@shared-types/geoTypes/city/city-translation";
import { RegionTranslation } from "@shared-types/geoTypes/region/region-translation";
import { UseMutateFunction } from "@tanstack/react-query";
import { ProfileForm } from "@shared-types/formData/profile-form";
import { ActionButtons } from "../../ui/ActionButtons";
import { LocationSelectors } from "../LocationSelectors";
import { UserInfoForm } from "../UserInfoForm";

type UserSettingsFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  saveChangesIsNotSubmitable: boolean;
  t: TFunction<"user-settings", undefined>;
  editFields: Record<string, boolean>;
  toggleEdit: (field: string) => void;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  avatarPreview: string;
  countriesData?: CountryTranslation[];
  regionsData?: RegionTranslation[];
  citiesData?: CityTranslation[];
  handleLocationChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  logoutMutate: UseMutateFunction<unknown, Error, void, unknown>;
  formState: ProfileForm;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  toggleShowChangePasswordModal: () => void;
  toggleShowDeleteAccountModal: () => void;
};

export const UserSettingsForm: FC<UserSettingsFormProps> = ({
  handleSubmit,
  saveChangesIsNotSubmitable,
  avatarPreview,
  editFields,
  handleAvatarChange,
  handleLocationChange,
  logoutMutate,
  t,
  toggleEdit,
  citiesData,
  countriesData,
  regionsData,
  formState,
  handleChange,
  toggleShowChangePasswordModal,
  toggleShowDeleteAccountModal,
}) => {
  return (
    <Form
      handleSubmit={handleSubmit}
      className="p-10 border-2 gap-46 border-separator rounded-4xl flex flex-col size-full max-w-339 max-h-192"
    >
      <div className="flex justify-between">
        <div className="flex flex-col max-w-150 max-h-90 size-full gap-6">
          <UserInfoForm
            t={t}
            editFields={editFields}
            toggleEdit={toggleEdit}
            formState={formState}
            handleChange={handleChange}
          />

          <LocationSelectors
            t={t}
            countriesData={countriesData}
            regionsData={regionsData}
            citiesData={citiesData}
            formState={formState}
            handleLocationChange={handleLocationChange}
          />
        </div>

        <AvatarUploader
          handleChange={handleAvatarChange}
          avatarPreview={avatarPreview}
        />
      </div>

      <ActionButtons
        saveChangesIsNotSubmitable={saveChangesIsNotSubmitable}
        toggleShowChangePasswordModal={toggleShowChangePasswordModal}
        toggleShowDeleteAccountModal={toggleShowDeleteAccountModal}
        logoutMutate={logoutMutate}
      />
    </Form>
  );
};
