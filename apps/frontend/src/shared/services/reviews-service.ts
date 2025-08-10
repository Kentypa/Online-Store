import api from "@config/axios";
import { WriteReviewDto } from "@features/StorePages/ProductPage/types/write-review-dto";
import { apiErrorHandler } from "@utils/api-error-handler";

export function reviewsService(url: string) {
  const writeReview = async (data: WriteReviewDto) => {
    return apiErrorHandler(() =>
      api.post(`/api/${url}/create-review`, { ...data })
    );
  };

  return { writeReview };
}
