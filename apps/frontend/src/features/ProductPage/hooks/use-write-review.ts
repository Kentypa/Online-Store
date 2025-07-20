import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { useForm } from "@hooks/use-form";
import { reviewsService } from "@services/reviewsService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { WriteReviewDto } from "../types/write-review-dto";

export const useWriteReview = (productId: number) => {
  const initialState = useMemo(() => false, []);
  const [showWriteReviewModal, setShowWriteReviewModal] =
    useState(initialState);

  const toggleShowWriteReviewModal = () =>
    setShowWriteReviewModal(!showWriteReviewModal);

  const closeReviewModal = () => setShowWriteReviewModal(false);

  const queryClient = useQueryClient();
  const { writeReview } = reviewsService(ServiceNames.REVIEWS);

  const { mutate, isSuccess, ...otherOptions } = useMutation({
    mutationFn: (data: Omit<WriteReviewDto, "productId">) =>
      writeReview({ ...data, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.PRODUCT, productId],
      });
    },
  });

  const initalState = useMemo<Omit<WriteReviewDto, "productId">>(
    () => ({ rating: null, comment: "" }),
    [],
  );

  const { formState, handleChangeByValue, handleChange, handleSubmit } =
    useForm<Omit<WriteReviewDto, "productId">>(initalState, mutate);

  return {
    formState,
    isSuccess,
    showWriteReviewModal,
    handleChange,
    handleSubmit,
    handleChangeByValue,
    toggleShowWriteReviewModal,
    closeReviewModal,
    ...otherOptions,
  };
};
