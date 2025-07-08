import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/use-popup";

type UseAccountRecoveryPopupsArgs = {
  userAccountRecoveryIsError: boolean;
};

export const useRecoveryPagePopups = ({
  userAccountRecoveryIsError,
}: UseAccountRecoveryPopupsArgs) => {
  usePopup({
    isActive: userAccountRecoveryIsError,
    message: "Can`t recovery user account. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
