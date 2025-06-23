import { FC } from "react";
import { Label } from "@forms/Label";
import UndefinedAvatar from "@icons/user-dark.svg";
import EditIcon from "@icons/edit.svg";

type AvatarUploaderProps = {
  avatarPreview: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatarPreview,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <Label>Avatar:</Label>
    <div className="relative group w-fit">
      <img
        src={avatarPreview || UndefinedAvatar}
        alt="Avatar Preview"
        className="size-24 object-cover rounded-full"
      />
      <div className="absolute inset-0 bg-[#00000088] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <img
        src={EditIcon}
        alt="Edit Icon"
        className="size-6 absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      />
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>
);
