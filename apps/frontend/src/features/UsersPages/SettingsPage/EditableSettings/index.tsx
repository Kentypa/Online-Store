import {
  EditableSettingsInput,
  EditableSettingsInputProps,
} from "../EditableSettingsInput";
import { FC } from "react";

type EditableSettingsProps = {
  editableSettings: EditableSettingsInputProps[];
};

export const EditableSettings: FC<EditableSettingsProps> = ({
  editableSettings,
}) => {
  return (
    <div className="flex flex-col max-w-150 max-h-90 size-full gap-6">
      {editableSettings.map((setting) => (
        <EditableSettingsInput key={setting.label} {...setting} />
      ))}
    </div>
  );
};
