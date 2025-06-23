import { useAppSelector } from "@hooks/redux";
import { Popup } from "@modals/PopUp";
import { popupsListSelector } from "@selectors/popupsListSelector";
import { FC } from "react";
import { createPortal } from "react-dom";

export const PopupList: FC = () => {
  const popups = useAppSelector(popupsListSelector);

  return createPortal(
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[50]">
      {popups.map((popup, index) => (
        <Popup
          key={popup.key ?? index}
          duration={popup.duration}
          popupKey={popup.key ?? index}
          message={popup.message}
          messageType={popup.messageType}
        />
      ))}
    </div>,
    document.body
  );
};
