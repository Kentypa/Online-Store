import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { ZoomImage } from "@ui/ZoomImage";
import { Swiper as SwiperType } from "swiper";
import { SliderNextButton } from "@ui/SliderNextButton";
import { SliderPrevButton } from "@ui/SliderPrevButton";
import { RefObject } from "react";

type ProductImagesSliderProps = {
  images: string[];
  thumbsSwiper: SwiperType | null;
  swiperRef: RefObject<SwiperType | null>;
  setThumbsSwiper: (swiper: SwiperType | null) => void;
};

export const ProductImagesSlider = ({
  images,
  thumbsSwiper,
  swiperRef,
  setThumbsSwiper,
}: ProductImagesSliderProps) => (
  <div className="flex flex-col items-center gap-9.5 p-10 rounded-4xl border-2 border-separator w-auto">
    <div className="relative w-full h-125 overflow-hidden rounded-4xl max-w-189">
      {images?.length > 0 && (
        <>
          <SliderPrevButton
            swiperRef={swiperRef}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-10"
          />
          <SliderNextButton
            swiperRef={swiperRef}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-10"
          />
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Thumbs]}
            thumbs={{
              swiper: thumbsSwiper && thumbsSwiper?.el ? thumbsSwiper : null,
            }}
            slidesPerView={1}
            loop={true}
            className="size-full"
          >
            {images?.map((src, idx) => (
              <SwiperSlide key={idx}>
                <ZoomImage src={`http://localhost:3000/public${src}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
    <div className="w-full max-w-189">
      {images?.length > 0 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={60}
          watchSlidesProgress
          centeredSlidesBounds={true}
          centeredSlides={true}
          slideToClickedSlide={true}
        >
          {images?.map((src, idx) => (
            <SwiperSlide key={idx} className="cursor-pointer">
              <img
                src={`http://localhost:3000/public${src}`}
                className="w-full size-25 rounded-4xl object-cover"
                alt={`Thumbnail ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  </div>
);
