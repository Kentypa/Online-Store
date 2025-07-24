import { ComponentWithChildren } from "@shared-types/components/component-with-children";
import { createPortal } from "react-dom";

type ModalProps = {
  visible: boolean;
  toggleModal: () => void;
  backgroundClassName: string;
};

export const Modal: ComponentWithChildren<ModalProps> = ({
  visible,
  backgroundClassName,
  children,
  toggleModal,
}) => {
  return (
    <>
      {visible &&
        createPortal(
          <div className={backgroundClassName} onClick={toggleModal}>
            <div className="contents" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
