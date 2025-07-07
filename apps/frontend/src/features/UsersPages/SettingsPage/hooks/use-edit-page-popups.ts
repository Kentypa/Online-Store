import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/use-popup";

type UseEditProfilePopupsArgs = {
  userUpdateIsSuccess: boolean;
  userUpdateIsError: boolean;
  avatarLoadingError: boolean;
  avatarUploadsErrorCounter: number;
  deleteAccountIsError: boolean;
};

export const useEditProfilePopups = ({
  userUpdateIsSuccess,
  userUpdateIsError,
  avatarLoadingError,
  avatarUploadsErrorCounter,
  deleteAccountIsError,
}: UseEditProfilePopupsArgs) => {
  usePopup({
    isActive: userUpdateIsSuccess,
    message: "User info successfully updated!",
  });

  usePopup({
    isActive: userUpdateIsError,
    message: "User info can’t be updated!",
    messageType: PopupMessageType.ERROR,
  });

  usePopup({
    isActive: avatarLoadingError,
    message: "Avatar upload failed. Only image files are allowed.",
    messageType: PopupMessageType.ERROR,
    key: `avatar-error-${avatarUploadsErrorCounter}`,
  });

  usePopup({
    isActive: deleteAccountIsError,
    message: "Account couldn’t be deleted. Try again.",
    messageType: PopupMessageType.ERROR,
  });
};
