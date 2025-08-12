import { Review } from "@shared-types/storeTypes/products/review";
import { calculateAverage } from "@utils/calculate-avarage";

export const calculateAvarageRating = (reviews: Review[] | undefined) => {
  if (reviews)
    return calculateAverage(
      reviews.map((review) => {
        return review.rating;
      })
    );
};
