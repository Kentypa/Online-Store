import { FC } from "react";
import FilledStar from "@icons/star-filled.svg?react";
import Star from "@icons/star.svg?react";

type StarsMarkProps = {
  starSize: number;
  between: number;
  rating: number;
  className?: string;
};

type StarParams = {
  width: number;
  height: number;
};

export const StarsMark: FC<StarsMarkProps> = ({
  between,
  rating,
  starSize,
  className = "flex fill-primary",
}) => {
  const params: StarParams = { height: starSize, width: starSize };

  return (
    <ul className={className} style={{ gap: `${between}px` }}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <li key={index}>
          {index < (Math.round(rating) ?? 0) ? (
            <FilledStar {...params} />
          ) : (
            <Star {...params} />
          )}
        </li>
      ))}
    </ul>
  );
};
