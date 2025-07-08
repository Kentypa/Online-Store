import { Input } from "@forms/Input";
import { Button } from "@ui/Button";
import { ChangeEvent, FC } from "react";
import EditFieldPencil from "@icons/pencil.svg?react";

export type EditableSettingsInputProps = {
  label: string;
  isEdited: boolean;
  name: string;
  value?: string | number;
  toggleEdit: () => void;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const EditableSettingsInput: FC<EditableSettingsInputProps> = ({
  label,
  isEdited,
  toggleEdit,
  handleChange,
  name,
  value,
}) => {
  return (
    <div className="flex w-full justify-between">
      {isEdited ? (
        <Input
          className="p-1 border-2 border-separator rounded-xl max-h-6"
          handleChange={handleChange}
          name={name}
          value={value}
        />
      ) : (
        <p>{label + value}</p>
      )}

      <Button handleClick={toggleEdit} type="button">
        <EditFieldPencil className="fill-primary size-6" />
      </Button>
    </div>
  );
};
