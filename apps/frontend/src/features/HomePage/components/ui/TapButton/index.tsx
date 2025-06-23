import { FC } from "react";
import { Button } from "@ui/Button";
import TapButtonIcon from "@icons/tap-button-image.svg";

type TapButtonProps = {
  handleClick: () => void;
  className?: string;
};

export const TapButton: FC<TapButtonProps> = ({ handleClick, className }) => {
  return (
    <Button handleClick={handleClick} className={className}>
      <img src={TapButtonIcon} alt="TabButtonIcon" />
    </Button>
  );
};
