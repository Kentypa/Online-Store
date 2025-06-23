import { FC } from "react";
import { Button } from "@ui/Button";

type GradientScrollButtonProps = {
  scrollDirection: () => void;
  visable: boolean;
  arrowIcon: string;
  buttonClassName?: string;
  gradientClassName?: string;
};

export const GradientScrollButton: FC<GradientScrollButtonProps> = ({
  scrollDirection,
  visable,
  arrowIcon,
  buttonClassName,
  gradientClassName,
}) => {
  if (!visable) return null;

  return (
    <>
      <Button
        handleClick={scrollDirection}
        className={`z-20 size-10 absolute ${buttonClassName} left-1/2 -translate-x-1/2 transform`}
      >
        <div className="flex justify-center items-center bg-background rounded-full size-10 z-30">
          <img src={arrowIcon} alt={arrowIcon} className="z-30" />
        </div>
      </Button>
      <div
        className={`${gradientClassName} z-10 absolute from-[rgba(250,250,250,0)] to-[#FAFAFA] h-[117px] w-full pointer-events-none`}
      />
    </>
  );
};
