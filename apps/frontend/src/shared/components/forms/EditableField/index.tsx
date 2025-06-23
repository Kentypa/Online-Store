import { Input } from "@forms/Input";
import { Label } from "@forms/Label";
import { Button } from "@ui/Button";
import { FC } from "react";
import EditIcon from "@icons/edit.svg";

type EditableFieldProps = {
  label: string;
  name: string;
  value?: string;
  isEditing?: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditableField: FC<EditableFieldProps> = ({
  label,
  name,
  value,
  isEditing,
  onToggle,
  onChange,
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
        handleChange={onChange}
        className="p-1 border rounded-xl border-subtle-light"
      />
    )}
    <Button type="button" handleClick={onToggle}>
      <img src={EditIcon} className="size-6" />
    </Button>
  </div>
);
