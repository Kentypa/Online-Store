import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/ui/use-popup";

type UseSignUpPopupsArgs = {
  userSignUpIsError: boolean;
};

export const useSignUpPopups = ({ userSignUpIsError }: UseSignUpPopupsArgs) => {
  usePopup({
    isActive: userSignUpIsError,
    message: "Can`t sign up user. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
