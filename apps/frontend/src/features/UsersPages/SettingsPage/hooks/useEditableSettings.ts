import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import { editableSettingsKeys } from "../settings/editableSettingsKeys";
import { EditableSettingsInputProps } from "../components/ui/EditableSettingsInput";
import { useEditableFields } from "@hooks/form/use-editable-fields";

export const useEditableSettings = (
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  formState: Record<string, string>,
): EditableSettingsInputProps[] => {
  const { t } = useTranslation("user-settings");

  const editableFieldsInitialState = Object.fromEntries(
    editableSettingsKeys.map((obj) => {
      const labelKey = Object.keys(obj)[0];
      return [labelKey, false];
    }),
  );

  const editableFields = useEditableFields(editableFieldsInitialState);

  return editableSettingsKeys.map((obj) => {
    const [labelKey, name] = Object.entries(obj)[0];
    return {
      label: t(`inputs.${labelKey}`),
      isEdited: editableFields.editFields[labelKey],
      toggleEdit: () => editableFields.toggleEdit(labelKey),
      handleChange,
      name,
      value: formState[name] || "",
    };
  });
};
