import { PopupMessageType } from "@enums/popupMessageType";
import { PopupsOptions } from "@enums/popupsOptions";
import { useAppDispatch } from "@hooks/redux";
import { popupsListRemove } from "@stores/popupsList/popupsListSlice";
import { FC, useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import CrossIcon from "@icons/cross.svg";

type PopupProps = {
  classname?: string;
  duration?: number;
  message: string;
  messageType?: PopupMessageType;
};

export const Popup: FC<PopupProps & { popupKey: string | number }> = ({
  classname = "",
  duration = PopupsOptions.POPUP_DURATION,
  popupKey,
  message,
  messageType = PopupMessageType.INFORMATION,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const dispatch = useAppDispatch();

  const startCloseAnimation = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      dispatch(popupsListRemove(popupKey));
    }, 500);
  }, [dispatch, popupKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startCloseAnimation();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, startCloseAnimation]);

  if (!isVisible) return null;

  return (
    <div
      className={`bg-surface border border-subtle-light rounded-2xl shadow-lg w-[320px] p-2 flex flex-col gap-3 ${
        isClosing ? styles["animate-slide-down"] : styles["animate-slide-up"]
      } ${classname}`}
    >
      <div className="relative">
        <button
          onClick={startCloseAnimation}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-700"
        >
          <img src={CrossIcon} alt="Close" className="w-4 h-4" />
        </button>
        <div className="h-2" />
      </div>

      <hr className="border-t border-subtle-light my-1" />

      <h3 className={messageType}>{message}</h3>

      <div className="h-2 w-full bg-subtle-light rounded-full overflow-hidden mt-2">
        <div
          className={`${styles["animate-progress"]} bg-primary h-full`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};
