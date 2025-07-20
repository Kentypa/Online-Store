import api from "@config/axios";
import { WriteReviewDto } from "@features/ProductPage/types/write-review-dto";

export function reviewsService(url: string) {
  const writeReview = async (data: WriteReviewDto) => {
    return api.post(`${url}/create-review`, { ...data }).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  return { writeReview };
}
