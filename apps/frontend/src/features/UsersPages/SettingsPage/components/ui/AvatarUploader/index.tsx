import { FC } from "react";
import { Input } from "@forms/Input";
import UndefinedAvatar from "@icons/user-avatar.svg?react";
import EditIcon from "@icons/pencil.svg?react";

type AvatarUploaderProps = {
  avatarPreview?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatarPreview,
  handleChange,
}) => (
  <div className="flex flex-col gap-2">
    <div className="relative group w-fit">
      {avatarPreview ? (
        <img
          src={avatarPreview}
          className="size-78 object-cover rounded-full"
        />
      ) : (
        <UndefinedAvatar className="fill-primary size-78" />
      )}
      <div className="absolute inset-0 bg-[#00000088] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <EditIcon className="size-6 fill-white absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Input
        type="file"
        accept="image/*"
        handleChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>
);
