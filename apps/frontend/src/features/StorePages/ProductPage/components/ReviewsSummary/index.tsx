import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useTranslation } from "react-i18next";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import Star from "@icons/star.svg?react";
import WriteReviewButton from "@icons/write-review.svg?react";

type ReviewsSummaryProps = {
  productData: ProductTranslation;
  averageRating?: number;
  reviewsCount?: number;
  isReviewed: boolean;
  toggleShowWriteReviewModal: () => void;
};

export const ReviewsSummary = ({
  productData,
  averageRating,
  reviewsCount,
  isReviewed,
  toggleShowWriteReviewModal,
}: ReviewsSummaryProps) => {
  const { t } = useTranslation("product");

  return (
    <div className="flex flex-col size-full max-w-87.5">
      <h5 className="text-display-smallest mb-6">
        {t("reviews.labels.reviews")}
      </h5>
      <div className="flex flex-col mb-6">
        <div className="flex flex-row w-full mb-2">
          {t("reviews.info.averageUserReview")}:&nbsp;
          <p className="font-semibold">{averageRating?.toFixed(2)}/5</p>
          <Star className="ml-1.5 size-6 fill-primary" />
        </div>
        <p className="text-body-small">
          {t("reviews.info.basedOn")}&nbsp;
          {reviewsCount}&nbsp;
          {t("reviews.info.reviews")}
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count =
            productData.product.reviews?.filter(
              (review) => review.rating === rating,
            ).length || 0;

          if (!reviewsCount) return null;
          const percentage = (count / reviewsCount) * 100;

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
        handleClick={toggleShowWriteReviewModal}
        disabled={isReviewed}
      >
        {t("buttons.writeReview")}
      </ButtonWithIcon>
    </div>
  );
};
