import { FC } from "react";
import FilledStar from "@icons/star-filled.svg?react";
import HollowStar from "@icons/star.svg?react";

type StarProps = {
  isFilled: boolean;
  size: number;
  className: string;
};

export const Star: FC<StarProps> = ({ className, isFilled, size }) => {
  const StarIcon = isFilled ? FilledStar : HollowStar;

  return <StarIcon width={size} height={size} className={className} />;
};
