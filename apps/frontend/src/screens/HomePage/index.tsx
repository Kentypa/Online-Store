import { FC, useRef } from "react";
import { MainContentWrapper } from "@wrappers/MainContentWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { SliderNextButton } from "@ui/SliderNextButton";
import { SliderPrevButton } from "@ui/SliderPrevButton";
import { useTranslation } from "react-i18next";
import { useProducts } from "@hooks/store/use-products";
import { SortProductsBy } from "@enums/sortProductsBy";
import { PaginationButtons } from "@business/PaginationButtons";
import { userSelector } from "@stores/selectors/userSelector";
import { useSearchParams } from "react-router";
import { ProductsList } from "@layout/ProductsList";
import { useAppSelector } from "@hooks/core/redux";
import "swiper/css";

export const HomePage: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation("home");
  const { region } = useAppSelector(userSelector);
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { productsData, total } = useProducts({
    langCode: i18n.language,
    limit,
    offset,
    sortBy: SortProductsBy.TOTAL_SOLD_DESC,
    regionId: region?.id,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <MainContentWrapper>
      <div className="flex flex-col w-full px-25 py-16 gap-30">
        <div className="relative w-full h-63 overflow-hidden rounded-4xl">
          <SliderPrevButton
            swiperRef={swiperRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          />
          <SliderNextButton
            swiperRef={swiperRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          />
          <div className="relative w-full h-full">
            <Swiper
              modules={[Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              loop={true}
              className="w-full h-full"
            >
              {[1, 2, 3, 4].map((_, idx) => (
                <SwiperSlide key={idx} className="w-full h-full">
                  <div className="w-full h-full bg-secondary" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-display-large">
            {region ? t("titles.region") : t("titles.default")}
          </h1>
          <ProductsList productsData={productsData} />
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </MainContentWrapper>
  );
};
