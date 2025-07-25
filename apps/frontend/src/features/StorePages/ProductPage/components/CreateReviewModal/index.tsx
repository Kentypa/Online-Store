import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { Label } from "@forms/Label";
import { Form } from "@forms/Form";
import { useTranslation } from "react-i18next";
import { WriteReviewDto } from "@features/StorePages/ProductPage/types/write-review-dto";
import { useIsNotSubmitable } from "@hooks/form/use-is-not-submitable";
import { Stars } from "@ui/Stars";

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
        <Stars
          rating={currentRating ?? 0}
          gap={4}
          starSize={24}
          handleChange={handleRatingChange}
          className="fill-primary flex"
        />
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
