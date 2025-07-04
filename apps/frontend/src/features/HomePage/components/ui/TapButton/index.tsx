import { FC, MouseEvent } from "react";
import TapButtonIcon from "@icons/tap-button-image.svg";

type TapButtonProps = {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const TapButton: FC<TapButtonProps> = ({ handleClick, className }) => {
  return (
    <button onClick={handleClick} className={className}>
      <img src={TapButtonIcon} alt="TabButtonIcon" className="rounded-full" />
    </button>
  );
};
