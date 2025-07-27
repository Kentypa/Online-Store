import { FC, useEffect } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { CategoryBreadcrumbs } from "@business/CategoryBreadcrumbs";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { CreateReviewModal } from "@features/StorePages/ProductPage/components/CreateReviewModal";
import { UsersReviews } from "@features/StorePages/ProductPage/components/UsersReviews";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useProductPageQueryParams } from "@features/StorePages/ProductPage/hooks/use-product-page-query-params";
import { useProductData } from "@features/StorePages/ProductPage/hooks/use-product-data";
import { useProductReviews } from "@features/StorePages/ProductPage/hooks/use-product-reviews";
import { useProductCart } from "@features/StorePages/ProductPage/hooks/use-product-cart";
import { ProductImagesSlider } from "@features/StorePages/ProductPage/components/ProductImagesSlider";
import { ProductInfo } from "@features/StorePages/ProductPage/components/ProductInfo";
import { ReviewsSummary } from "@features/StorePages/ProductPage/components/ReviewsSummary";
import { useProductImagesSlider } from "@features/StorePages/ProductPage/hooks/use-product-image-slider";
import ViewReviews from "@icons/view-review.svg?react";

export const ProductPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("product");
  const { productId } = useProductPageQueryParams();
  const {
    productData,
    productImages,
    productAvarageRating,
    productReviewsCount,
  } = useProductData(productId);

  const { thumbsSwiper, setThumbsSwiper, swiperRef } = useProductImagesSlider();

  const {
    showAllReviews,
    setShowAllReviews,
    formState,
    handleChange,
    handleChangeByValue,
    handleSubmit,
    showWriteReviewModal,
    toggleShowWriteReviewModal,
    isReviewed,
    closeReviewModal,
    userWriteReviewIsSuccess,
  } = useProductReviews(productId, productData);

  const { isAlreadyInCart, addToCart } = useProductCart(productId);

  useEffect(() => {
    if (userWriteReviewIsSuccess) closeReviewModal();
  }, [closeReviewModal, userWriteReviewIsSuccess]);

  const handleSetNewCategory = (categoryId: string) => {
    const newParams = new URLSearchParams({ categoryId });
    navigate(`${PagesEndponts.PRODUCTS}?${newParams.toString()}`);
  };

  const handleShowReviews = () => setShowAllReviews(true);

  return (
    <MainContentWrapper>
      <CreateReviewModal
        formState={formState}
        handleChange={handleChange}
        handleChangeByValue={handleChangeByValue}
        handleSubmit={handleSubmit}
        toggleModal={toggleShowWriteReviewModal}
        visible={showWriteReviewModal}
      />

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
              <ProductImagesSlider
                images={productImages || []}
                thumbsSwiper={thumbsSwiper}
                swiperRef={swiperRef}
                setThumbsSwiper={setThumbsSwiper}
              />

              <ProductInfo
                productData={productData}
                averageRating={productAvarageRating}
                isAlreadyInCart={isAlreadyInCart}
                addToCart={addToCart}
              />
            </div>

            <div className="flex size-full p-10 border-2 border-separator rounded-4xl gap-27.5">
              <ReviewsSummary
                productData={productData}
                averageRating={productAvarageRating}
                reviewsCount={productReviewsCount}
                isReviewed={isReviewed}
                toggleShowWriteReviewModal={toggleShowWriteReviewModal}
              />

              <ul className="flex flex-col gap-9 size-full">
                <UsersReviews
                  productReviewsCount={productReviewsCount ?? 0}
                  reviews={productData.product.reviews}
                  showAllReviews={showAllReviews}
                />

                {!showAllReviews && (productReviewsCount ?? 0) > 3 && (
                  <ButtonWithIcon
                    icon={<ViewReviews className="size-6 fill-white" />}
                    className="flex justify-center items-center p-3 size-full max-w-87.5 bg-primary rounded-4xl"
                    handleClick={handleShowReviews}
                  >
                    <p className="text-white">{t("buttons.viewAllReviews")}</p>
                  </ButtonWithIcon>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </MainContentWrapper>
  );
};
