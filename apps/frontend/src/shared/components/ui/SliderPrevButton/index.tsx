import { Button } from "@ui/Button";
import { SwiperButtonProps } from "@shared-types/ui/swiper-button-props";
import LeftArrow from "@icons/angle-left.svg?react";

export const SliderPrevButton = ({
  swiperRef,
  className,
}: SwiperButtonProps) => {
  return (
    <Button
      handleClick={() => swiperRef.current?.slidePrev()}
      className={`p-3 rounded-full bg-background ${className}`}
    >
      <LeftArrow className="size-6 fill-primary" />
    </Button>
  );
};
