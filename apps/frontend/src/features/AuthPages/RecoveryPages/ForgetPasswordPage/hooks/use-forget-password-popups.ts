import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/use-popup";

type UseForgetPasswordPopupsArgs = {
  userForgetPasswordIsError: boolean;
};

export const useForgetPasswordPagePopups = ({
  userForgetPasswordIsError,
}: UseForgetPasswordPopupsArgs) => {
  usePopup({
    isActive: userForgetPasswordIsError,
    message: "Can`t request for restore password. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
