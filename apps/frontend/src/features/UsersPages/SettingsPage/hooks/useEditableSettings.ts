import { useEditableFields } from "@hooks/use-editable-fields";
import { useTranslation } from "react-i18next";
import { EditableSettingsInputProps } from "../EditableSettingsInput";
import { ChangeEvent } from "react";
import { editableSettingsKeys } from "../settings/editableSettingsKeys";

export const useEditableSettings = (
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
) => {
  const { t } = useTranslation("user-settings");

  const editableFieldsInitialState = Object.fromEntries(
    editableSettingsKeys.map((key) => [key, false])
  );

  const editableFields = useEditableFields(editableFieldsInitialState);

  const createEditableInput = (key: string): EditableSettingsInputProps => ({
    label: t(`inputs.${key}`),
    isEdited: editableFields.editFields[key],
    toggleEdit: () => editableFields.toggleEdit(key),
    handleChange,
  });

  return editableSettingsKeys.map(createEditableInput);
};
