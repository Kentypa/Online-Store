import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/ui/use-popup";

type UseWriteReviewPopupsArgs = {
  userWriteReviewError: boolean;
};

export const useWriteReviewPopups = ({
  userWriteReviewError,
}: UseWriteReviewPopupsArgs) => {
  usePopup({
    isActive: userWriteReviewError,
    message: "Can`t write review. Review is exists.",
    messageType: PopupMessageType.ERROR,
  });
};
