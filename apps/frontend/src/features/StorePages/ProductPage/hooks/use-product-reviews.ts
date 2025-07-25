import { useState } from "react";
import { useWriteReview } from "@features/StorePages/ProductPage/hooks/use-write-review";
import { useAppSelector } from "@hooks/core/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useWriteReviewPopups } from "@features/StorePages/ProductPage/hooks/use-write-review-popups";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";

export const useProductReviews = (
  productId: number,
  productData?: ProductTranslation,
) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { isAuthenticated, id } = useAppSelector(userSelector);

  const {
    formState,
    handleChange,
    handleChangeByValue,
    handleSubmit,
    showWriteReviewModal,
    toggleShowWriteReviewModal,
    closeReviewModal,
    isError: userWriteReviewError,
    isSuccess: userWriteReviewIsSuccess,
  } = useWriteReview(productId);

  useWriteReviewPopups({ userWriteReviewError });

  const userIsGuest = !isAuthenticated;
  const userHasLeftReview =
    productData?.product?.reviews?.some((review) => review.user_id === id) ??
    false;

  const isReviewed = userIsGuest || userHasLeftReview;

  return {
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
  };
};
