import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { Label } from "@forms/Label";
import { Form } from "@forms/Form";
import { useTranslation } from "react-i18next";
import { WriteReviewDto } from "@features/ProductPage/types/write-review-dto";
import FilledStar from "@icons/star-filled.svg?react";
import Star from "@icons/star.svg?react";

type CreateReviewModalProps = {
  visible: boolean;
  formState: Omit<WriteReviewDto, "productId">;
  toggleModal: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeByValue: <K extends keyof Omit<WriteReviewDto, "productId">>(
    name: K,
    value: Omit<WriteReviewDto, "productId">[K],
  ) => void;
};

export const CreateReviewModal: FC<CreateReviewModalProps> = ({
  visible,
  formState,
  toggleModal,
  handleChange,
  handleSubmit,
  handleChangeByValue,
}) => {
  const initialState = useMemo(() => ({ rating: null, comment: "" }), []);

  const changesIsNotSubmitable = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  const { t } = useTranslation("product");
  const currentRating = formState.rating;
  const handleRatingChange = (rating: number) => {
    handleChangeByValue("rating", rating);
  };

  return (
    <Modal
      toggleModal={toggleModal}
      visible={visible}
      backgroundClassName="z-10 bg-[#12121280] fixed inset-0 flex justify-center items-center"
    >
      <Form
        className="bg-white flex flex-col border border-separator rounded-xl p-3 gap-3"
        handleSubmit={handleSubmit}
      >
        <Label>{t("modals.createReview.labels.rating")}</Label>
        <ul className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <li key={rating}>
              <Button
                handleClick={() => handleRatingChange(rating)}
                type="button"
              >
                {currentRating && rating <= currentRating ? (
                  <FilledStar className="fill-primary size-6" />
                ) : (
                  <Star className="fill-primary size-6" />
                )}
              </Button>
            </li>
          ))}
        </ul>
        <Label>{t("modals.createReview.labels.comment")}</Label>
        <Input
          handleChange={handleChange}
          value={formState.comment}
          name="comment"
          className="p-1 border border-separator rounded-xl"
          type="text"
        />
        <div className="flex justify-between">
          <Button
            className="p-3 bg-primary text-white rounded-2xl"
            type="submit"
            disabled={changesIsNotSubmitable}
          >
            {t("modals.createReview.buttons.confirm")}
          </Button>
          <Button
            className="p-3 bg-separator rounded-2xl"
            handleClick={toggleModal}
          >
            {t("modals.createReview.buttons.cancel")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
