import { UseMutateFunction } from "@tanstack/react-query";
import { ChangePasswordButton } from "../buttons/ChangePasswordButton";
import { DeleteAccountButton } from "../buttons/DeleteAccountButton";
import { LogoutButton } from "../buttons/LogoutButton";
import { SaveChangesButton } from "../buttons/SaveChangesButton";
import { FC } from "react";

type ActionButtonsProps = {
  saveChangesIsNotSubmitable: boolean;
  toggleShowChangePasswordModal: () => void;
  toggleShowDeleteAccountModal: () => void;
  logoutMutate: UseMutateFunction<unknown, Error, void, unknown>;
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  saveChangesIsNotSubmitable,
  toggleShowChangePasswordModal,
  toggleShowDeleteAccountModal,
  logoutMutate,
}) => (
  <div className="flex justify-between">
    <SaveChangesButton type="submit" disabled={saveChangesIsNotSubmitable} />

    <div className="flex flex-col gap-6 max-w-62.5 w-full">
      <ChangePasswordButton
        type="button"
        handleClick={toggleShowChangePasswordModal}
      />
      <LogoutButton handleClick={logoutMutate} />
      <DeleteAccountButton
        type="button"
        handleClick={toggleShowDeleteAccountModal}
      />
    </div>
  </div>
);
