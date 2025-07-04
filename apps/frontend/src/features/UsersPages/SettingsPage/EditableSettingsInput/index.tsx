import { Input } from "@forms/Input";
import { Button } from "@ui/Button";
import { ChangeEvent, FC } from "react";
import EditFieldPencil from "@icons/pencil.svg?react";

export type EditableSettingsInputProps = {
  label: string;
  isEdited: boolean;
  toggleEdit: () => void;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  initialLabel?: string;
};

export const EditableSettingsInput: FC<EditableSettingsInputProps> = ({
  label,
  isEdited,
  toggleEdit,
  handleChange,
  initialLabel = "",
}) => {
  return (
    <div className="flex w-full justify-between">
      {isEdited ? (
        <Input
          className="p-1 border-2 border-separator rounded-xl max-h-6"
          handleChange={handleChange}
          name={label}
        />
      ) : (
        <p>{label + initialLabel}</p>
      )}

      <Button handleClick={toggleEdit}>
        <EditFieldPencil className="fill-primary size-6" />
      </Button>
    </div>
  );
};
