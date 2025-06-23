import { Input } from "@forms/Input";
import { Label } from "@forms/Label";
import { Button } from "@ui/Button";
import { FC } from "react";
import EditIcon from "@icons/edit.svg";

type EditablePasswordProps = {
  oldPassword?: string;
  newPassword?: string;
  isEditing: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditablePassword: FC<EditablePasswordProps> = ({
  oldPassword,
  newPassword,
  isEditing,
  onToggle,
  onChange,
}) => (
  <div className="flex justify-between items-start gap-2">
    {!isEditing ? (
      <Label>Password: ********</Label>
    ) : (
      <div className="flex flex-col gap-2 w-full">
        <Input
          name="oldPassword"
          type="password"
          placeholder="Current password"
          value={oldPassword || ""}
          handleChange={onChange}
          className="p-1 border rounded-xl border-subtle-light"
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="New password"
          value={newPassword || ""}
          handleChange={onChange}
          className="p-1 border rounded-xl border-subtle-light"
        />
      </div>
    )}
    <Button type="button" handleClick={onToggle} className="mt-1">
      <img src={EditIcon} className="size-6" />
    </Button>
  </div>
);
