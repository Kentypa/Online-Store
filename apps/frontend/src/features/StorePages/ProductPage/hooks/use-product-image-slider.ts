import { useState, useRef } from "react";
import { Swiper as SwiperType } from "swiper";

export const useProductImagesSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return {
    thumbsSwiper,
    setThumbsSwiper,
    swiperRef,
  };
};
