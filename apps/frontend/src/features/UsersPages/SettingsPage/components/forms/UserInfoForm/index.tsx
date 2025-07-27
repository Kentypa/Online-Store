import { TFunction } from "i18next";
import { ProfileForm } from "@shared-types/formData/profile-form";
import { ChangeEvent, FC, FormEvent } from "react";
import { EditableSettingsInput } from "../../ui/EditableSettingsInput";

type UserInfoFormProps = {
  t: TFunction;
  editFields: Record<string, boolean>;
  toggleEdit: (field: string) => void;
  formState: ProfileForm;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInput: (e: FormEvent<HTMLInputElement>) => void;
};

export const UserInfoForm: FC<UserInfoFormProps> = ({
  t,
  editFields,
  toggleEdit,
  formState,
  handleChange,
  handleInput,
}) => (
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
      type="tel"
      inputMode="tel"
      pattern="[+0-9\s\-]{3,15}"
      onInput={handleInput}
    />
  </div>
);
