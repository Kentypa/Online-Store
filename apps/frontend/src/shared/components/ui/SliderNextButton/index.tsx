import { SwiperButtonProps } from "@shared-types/swiper-button-props";
import { Button } from "@ui/Button";
import RightArrow from "@icons/angle-right.svg?react";

export const SliderNextButton = ({
  swiperRef,
  className,
}: SwiperButtonProps) => {
  return (
    <Button
      handleClick={() => swiperRef.current?.slideNext()}
      className={`p-3 rounded-full bg-background ${className}`}
    >
      <RightArrow className="size-6 fill-primary" />
    </Button>
  );
};
