import { useEffect } from "react";
import { usePushPopupArgs, usePushPopup } from "./use-push-popup";

type usePopupArgs = usePushPopupArgs & { isActive: boolean };

export const usePopup = ({
  isActive,
  message,
  key,
  messageType,
}: usePopupArgs) => {
  const pushPopup = usePushPopup();

  useEffect(() => {
    if (isActive) pushPopup({ message, key, messageType });
  }, [isActive, key, message, pushPopup, messageType]);
};
