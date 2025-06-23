import { Button } from "@ui/Button";
import { FC } from "react";
import DeleteAccountIcon from "@icons/delete-account.svg";

type DeleteAccountButtonProps = {
  className?: string;
  handleClick: () => void;
};

export const DeleteAccountButton: FC<DeleteAccountButtonProps> = ({
  className,
  handleClick,
}) => {
  return (
    <Button
      handleClick={handleClick}
      className={`w-fit bg-dangerous rounded-2xl text-label-large ${className}`}
    >
      <div className="flex flex-row px-5 py-3">
        <div className="flex items-center justify-center size-6 mr-1.5">
          <img src={DeleteAccountIcon} alt="delete-account" />
        </div>
        Delete account
      </div>
    </Button>
  );
};
