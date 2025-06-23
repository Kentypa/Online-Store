import { PopupMessageType } from "@enums/popupMessageType";
import { popupsListPush } from "@stores/popupsList/popupsListSlice";
import { useCallback } from "react";
import { useAppDispatch } from "@hooks/redux";

export type usePushPopupArgs = {
  message: string;
  messageType?: PopupMessageType;
  key?: string;
};

export const usePushPopup = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    ({ message, key, messageType }: usePushPopupArgs) => {
      dispatch(
        popupsListPush({
          message,
          messageType,
          key: key ?? Date.now() + message,
        })
      );
    },
    [dispatch]
  );
};
