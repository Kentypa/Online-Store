import { Review } from "@shared-types/review";
import { calculateAverage } from "@utils/calculateAvarage";

export const calculateAvarageRating = (reviews: Review[] | undefined) => {
  if (reviews)
    return calculateAverage(
      reviews.map((review) => {
        return review.rating;
      }),
    );
};
