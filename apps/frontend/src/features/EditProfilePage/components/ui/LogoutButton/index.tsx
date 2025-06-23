import { Button } from "@ui/Button";
import { FC } from "react";
import LogoutIcon from "@icons/logout.svg";

type LogoutButtonProps = {
  className?: string;
  handleClick: () => void;
};

export const LogoutButton: FC<LogoutButtonProps> = ({
  className,
  handleClick,
}) => {
  return (
    <Button
      handleClick={handleClick}
      className={`w-fit bg-background rounded-2xl text-label-large ${className}`}
    >
      <div className="flex flex-row px-5 py-3">
        <div className="flex items-center justify-center size-6 mr-1.5">
          <img src={LogoutIcon} alt="account-logout" />
        </div>
        Logout
      </div>
    </Button>
  );
};
