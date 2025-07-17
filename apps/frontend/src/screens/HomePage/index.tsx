import { FC, useRef } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { SliderNextButton } from "@ui/SliderNextButton";
import { SliderPrevButton } from "@ui/SliderPrevButton";
import { useTranslation } from "react-i18next";
import { useProducts } from "@hooks/use-products";
import { SortProductsBy } from "@enums/sortProductsBy";
import "swiper/css";
import { convertCurrency } from "@utils/currencyConverter";
import { formatCurrency } from "@utils/formatCurrency";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import AddToCartIcon from "@icons/shopping-cart-add.svg?react";
import { PaginationButtons } from "@business/PaginationButtons";
import { useAppSelector } from "@hooks/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useSearchParams } from "react-router";

export const HomePage: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t, i18n } = useTranslation("home");
  const { region } = useAppSelector(userSelector);
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { productsData, total, isFetched } = useProducts({
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

          <ul className="grid grid-cols-5 gap-[105px]">
            {isFetched &&
              productsData.map((productData) => (
                <div
                  key={productData.product.id}
                  className="h-90 w-60 size-full flex flex-col p-2.5 bg-background border-2 border-separator rounded-2xl"
                >
                  <img
                    className="w-[240px] h-[135px] rounded-2xl"
                    src={`http://localhost:3000/public${productData.product.main_image_url}`}
                    alt={productData.title}
                  />
                  <div className="flex flex-col gap-3 mt-3">
                    <h5 className="truncate">{productData.title}</h5>
                    <p>
                      {formatCurrency(
                        convertCurrency(
                          productData.product.price,
                          i18n.language === "uk" ? "UAH" : "USD",
                        ),
                        i18n.language === "uk" ? "UAH" : "USD",
                        i18n.language === "uk" ? "uk-UA" : "en-US",
                      )}
                    </p>
                  </div>
                  <ButtonWithIcon
                    icon={<AddToCartIcon className="fill-white size-6" />}
                    className="bg-primary text-white flex max-w-32 max-h-12 items-center justify-center size-full rounded-4xl mt-auto"
                  >
                    {t("buttons.buy")}
                  </ButtonWithIcon>
                </div>
              ))}
          </ul>

          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </MainContentWrapper>
  );
};
