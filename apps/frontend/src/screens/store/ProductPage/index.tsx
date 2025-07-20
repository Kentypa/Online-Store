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
import { convertCurrency } from "@utils/currencyConverter";
import { formatCurrency } from "@utils/formatCurrency";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import Star from "@icons/star.svg?react";
import ShoppingCart from "@icons/shopping-cart.svg?react";
import ShoppingCartAdd from "@icons/shopping-cart-add.svg?react";
import WriteReviewButton from "@icons/write-review.svg?react";
import ViewReviews from "@icons/view-review.svg?react";
import "swiper/css";
import { UserReviewInfo } from "@features/ProductPage/components/UserReviewInfo";
import { StarsMark } from "@features/ProductPage/components/StarsMark";

export const ProductPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const { t, i18n } = useTranslation("product");
  const productId = Number(searchParams.get("productId"));
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleShowReviews = () => setShowAllReviews(true);

  const {
    productData,
    productImages,
    productAvarageRating,
    productReviewsCount,
  } = useProduct({
    langCode: i18n.language,
    productId,
    withReviews: true,
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
          <div className="flex flex-col gap-11">
            <div className="flex justify-between gap-27">
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
              <div className="flex flex-col p-14.5 rounded-4xl border-2 border-separator size-full">
                <div className="flex flex-col gap-38.5">
                  <div className="flex flex-col gap-12">
                    <div>
                      <div className="max-h-15 mb-6">
                        <h2 className="text-display-smallest">
                          {productData.title}
                        </h2>
                      </div>
                      <StarsMark
                        between={12}
                        rating={productAvarageRating ?? 0}
                        starSize={24}
                      />
                    </div>
                    <div className="flex size-full max-h-60">
                      {productData.description}
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className="text-display-small">
                      {t("labels.price")}&nbsp;
                      {formatCurrency(
                        convertCurrency(
                          productData.product.price,
                          i18n.language === "uk" ? "UAH" : "USD",
                        ),
                        i18n.language === "uk" ? "UAH" : "USD",
                        i18n.language === "uk" ? "uk-UA" : "en-US",
                      )}
                    </p>
                    <div className="flex gap-9">
                      <ButtonWithIcon
                        icon={<ShoppingCartAdd className="size-6 fill-white" />}
                        className="p-3 rounded-4xl bg-primary text-white"
                      >
                        {t("buttons.addToCart")}
                      </ButtonWithIcon>
                      <ButtonWithIcon
                        icon={<ShoppingCart className="size-6 fill-white" />}
                        className="p-3 rounded-4xl bg-primary text-white"
                      >
                        {t("buttons.buyNow")}
                      </ButtonWithIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex size-full p-10 border-2 border-separator rounded-4xl gap-27.5">
              <div className="flex flex-col size-full max-w-87.5">
                <h5 className="text-display-smallest mb-6">
                  {t("reviews.labels.reviews")}
                </h5>
                <div className="flex flex-col mb-6">
                  <div className="flex flex-row w-full mb-2">
                    {t("reviews.info.averageUserReview")}:&nbsp;
                    <p className="font-semibold">
                      {productAvarageRating?.toFixed(2)}/5
                    </p>
                    <Star className="ml-1.5 size-6 fill-primary" />
                  </div>
                  <p className="text-body-small">
                    {t("reviews.info.basedOn")}&nbsp;
                    {productReviewsCount}&nbsp;
                    {t("reviews.info.reviews")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count =
                      productData.product.reviews?.filter(
                        (review) => review.rating === rating,
                      ).length || 0;

                    if (!productReviewsCount) return null;
                    const percentage = (count / productReviewsCount) * 100;

                    return (
                      <li
                        key={rating}
                        className="flex flex-row gap-2.5 w-full items-center"
                      >
                        <p className="w-2.5">{rating}</p>
                        <Star className="size-6 fill-primary" />
                        <div className="relative w-45 h-2.5 rounded-lg bg-surface border border-separator">
                          <span
                            className="absolute h-2.5 rounded-lg bg-primary max-w-45"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span>({count})</span>
                      </li>
                    );
                  })}
                </ul>
                <ButtonWithIcon
                  icon={<WriteReviewButton className="size-6 fill-white" />}
                  className="text-white p-3 bg-primary rounded-4xl flex justify-center items-center mt-9"
                >
                  {t("buttons.writeReview")}
                </ButtonWithIcon>
              </div>
              <div className="flex flex-col gap-9 size-full">
                {productData &&
                  productData.product.reviews
                    .slice(0, showAllReviews ? productReviewsCount : 3)
                    .map((review) => (
                      <div className="rounded-4xl border-2 border-separator p-6 flex w-full">
                        <div className="flex flex-col gap-2">
                          <UserReviewInfo userId={review.user_id} />
                          <StarsMark
                            between={6}
                            rating={review.rating ?? 0}
                            starSize={12}
                          />
                          <p className="text-body-small max-h-15">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                {!showAllReviews && (
                  <ButtonWithIcon
                    icon={<ViewReviews className="size-6 fill-white" />}
                    className="flex justify-center items-center p-3 size-full max-w-87.5 bg-primary rounded-4xl"
                    handleClick={handleShowReviews}
                  >
                    <p className="text-white">{t("buttons.viewAllReviews")}</p>
                  </ButtonWithIcon>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainContentWrapper>
  );
};
