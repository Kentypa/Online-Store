import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/ui/use-popup";

type UseResetPasswordPopupsArgs = {
  userResetPasswordIsError: boolean;
};

export const useResetPasswordPagePopups = ({
  userResetPasswordIsError,
}: UseResetPasswordPopupsArgs) => {
  usePopup({
    isActive: userResetPasswordIsError,
    message: "Can`t request for restore password. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
