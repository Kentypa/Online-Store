import { RefObject } from "react";
import SwiperInstance from "swiper";

export type SwiperButtonProps = {
  swiperRef: RefObject<SwiperInstance | null>;
  className?: string;
};
