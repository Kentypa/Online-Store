import { FC } from "react";
import FirstPlaceIcon from "@icons/first-place.svg";
import SecondPlaceIcon from "@icons/second-place.svg";
import ThirdPlaceIcon from "@icons/third-place.svg";

type RatingIconProps = {
  rating: number;
};

const ratingIcons: { [key: number]: string } = {
  1: FirstPlaceIcon,
  2: SecondPlaceIcon,
  3: ThirdPlaceIcon,
};

export const RatingIcon: FC<RatingIconProps> = ({ rating }) => {
  const Icon = ratingIcons[rating];

  if (!Icon) {
    return null;
  }

  return <img src={Icon} alt={`${rating} place`} className="absolute left-0" />;
};
