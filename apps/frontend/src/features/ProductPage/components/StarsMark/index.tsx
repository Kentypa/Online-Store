import { FC } from "react";
import FilledStar from "@icons/star-filled.svg?react";
import Star from "@icons/star.svg?react";

type StarsMarkProps = {
  starSize: number;
  between: number;
  rating: number;
  className?: string;
};

export const StarsMark: FC<StarsMarkProps> = ({
  between,
  rating,
  starSize,
  className = "flex fill-primary",
}) => {
  return (
    <ul className={className} style={{ gap: `${between}px` }}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <li key={index}>
          {index < (rating ?? 0) ? (
            <FilledStar width={starSize} height={starSize} />
          ) : (
            <Star width={starSize} height={starSize} />
          )}
        </li>
      ))}
    </ul>
  );
};
