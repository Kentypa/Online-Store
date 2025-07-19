import { FC, useRef, useState } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { useProduct } from "@hooks/use-product";
import { CategoryBreadcrumbs } from "@business/CategoryBreadcrumbs";
import { SliderNextButton } from "@ui/SliderNextButton";
import { SliderPrevButton } from "@ui/SliderPrevButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { ZoomImage } from "@features/ProductPage/components/ZoomImage";
import "swiper/css";

export const ProductPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const { i18n } = useTranslation("products");
  const productId = Number(searchParams.get("productId"));

  const { productData, productImages } = useProduct({
    langCode: i18n.language,
    productId,
  });

  const handleSetNewCategory = (categoryId: string) => {
    const newParams = new URLSearchParams({ categoryId });
    navigate(`${PagesEndponts.PRODUCTS}?${newParams.toString()}`);
  };

  return (
    <MainContentWrapper>
      {productData && (
        <div className="flex flex-col py-6 px-18 size-full">
          <div className="flex w-full mb-6">
            <CategoryBreadcrumbs
              categoryId={productData.product.category_id}
              handleSetNewCategory={handleSetNewCategory}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-9.5 p-10 rounded-4xl border-2 border-separator w-auto">
              <div className="relative w-full h-125 overflow-hidden rounded-4xl max-w-189">
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
                  thumbs={{ swiper: thumbsSwiper }}
                  slidesPerView={1}
                  loop={true}
                  className="size-full"
                >
                  {productImages?.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <ZoomImage src={`http://localhost:3000/public${src}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="w-full max-w-189">
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
                  {productImages?.map((src, idx) => (
                    <SwiperSlide key={idx} className="cursor-pointer">
                      <img
                        src={`http://localhost:3000/public${src}`}
                        className="w-full size-25 rounded-4xl object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainContentWrapper>
  );
};
