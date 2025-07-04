import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/use-popup";

type UseSignInPopupsArgs = {
  userSignInIsError: boolean;
};

export const useSignInPopups = ({ userSignInIsError }: UseSignInPopupsArgs) => {
  usePopup({
    isActive: userSignInIsError,
    message: "Can`t sign in user. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
