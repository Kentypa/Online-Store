import { Input } from "@forms/Input";
import { Label } from "@forms/Label";
import { Button } from "@ui/Button";
import { ChangeEvent, FC } from "react";
import EditIcon from "@icons/edit.svg";

type EditableFieldProps = {
  label: string;
  name: string;
  value?: string;
  isEditing?: boolean;
  handleToggle: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EditableField: FC<EditableFieldProps> = ({
  label,
  name,
  value,
  isEditing,
  handleToggle,
  handleChange,
}) => (
  <div className="flex justify-between items-center gap-2">
    {!isEditing ? (
      <Label>
        {label}: {value}
      </Label>
    ) : (
      <Input
        name={name}
        value={value || ""}
        handleChange={handleChange}
        className="p-1 border rounded-4xl border-separator"
      />
    )}
    <Button type="button" handleClick={handleToggle}>
      <img src={EditIcon} className="size-6" />
    </Button>
  </div>
);
