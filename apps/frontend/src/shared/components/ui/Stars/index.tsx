import { FC } from "react";
import { Button } from "@ui/Button";
import { Star } from "../Star";

type StarsProps = {
  rating: number;
  handleChange?: (rating: number) => void;
  starSize?: number;
  gap?: number;
  className?: string;
};

export const Stars: FC<StarsProps> = ({
  rating,
  handleChange,
  starSize = 24,
  gap = 4,
  className = "",
}) => {
  const isInteractive = typeof handleChange === "function";
  const displayRating = Math.round(rating);

  const getStarProps = (index: number) => ({
    isFilled: index <= displayRating,
    size: starSize,
    className: "fill-primary",
  });

  return (
    <ul className={className} style={{ gap: `${gap}px` }}>
      {[1, 2, 3, 4, 5].map((index) => {
        const starElement = <Star {...getStarProps(index)} />;

        return (
          <li key={index}>
            {isInteractive ? (
              <Button type="button" handleClick={() => handleChange?.(index)}>
                {starElement}
              </Button>
            ) : (
              starElement
            )}
          </li>
        );
      })}
    </ul>
  );
};
