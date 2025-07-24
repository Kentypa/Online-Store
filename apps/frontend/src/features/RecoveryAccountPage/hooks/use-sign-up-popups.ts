import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/ui/use-popup";

type UseRecoveryAccountPopupsArgs = {
  isError: boolean;
};

export const useRecoveryAccountPopups = ({
  isError,
}: UseRecoveryAccountPopupsArgs) => {
  usePopup({
    isActive: isError,
    message: "Can`t recovery account. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
