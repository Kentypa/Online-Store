import { FC } from "react";
import { Button } from "@ui/Button";
import { DeleteAccountButton } from "../DeleteAccountButton";
import { LogoutButton } from "../LogoutButton";

type EditProfileActionButtonsProps = {
  handleDeleteAccount: () => void;
  handleLogout: () => void;
  isNotSubmitable: boolean;
};

export const EditProfileActionButtons: FC<EditProfileActionButtonsProps> = ({
  handleDeleteAccount,
  handleLogout,
  isNotSubmitable,
}) => {
  return (
    <div className="flex justify-between">
      <Button
        disabled={isNotSubmitable}
        type="submit"
        className="p-3 bg-primary rounded-2xl text-white"
      >
        Save Changes
      </Button>
      <div className="flex gap-3">
        <LogoutButton handleClick={handleLogout} />
        <DeleteAccountButton handleClick={handleDeleteAccount} />
      </div>
    </div>
  );
};
