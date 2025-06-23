import { FC } from "react";
import { Button } from "@ui/Button";
import { DeleteAccountButton } from "../DeleteAccountButton";
import { LogoutButton } from "../LogoutButton";

type EditProfileActionButtonsProps = {
  handleDeleteAccount: () => void;
  handleLogout: () => void;
};

export const EditProfileActionButtons: FC<EditProfileActionButtonsProps> = ({
  handleDeleteAccount,
  handleLogout,
}) => {
  return (
    <div className="flex justify-between">
      <Button type="submit" className="p-3 bg-primary rounded-2xl text-white">
        Save Changes
      </Button>
      <div className="flex gap-3">
        <LogoutButton handleClick={handleLogout} />
        <DeleteAccountButton handleClick={handleDeleteAccount} />
      </div>
    </div>
  );
};
