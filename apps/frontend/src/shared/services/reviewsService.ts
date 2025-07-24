import api from "@config/axios";
import { WriteReviewDto } from "@features/ProductPage/types/write-review-dto";
import { apiErrorHandler } from "@utils/apiErrorHandler";

export function reviewsService(url: string) {
  const writeReview = async (data: WriteReviewDto) => {
    return apiErrorHandler(() => api.post(`${url}/create-review`, { ...data }));
  };

  return { writeReview };
}
