import { PopupMessageType } from "@enums/popupMessageType";
import { usePopup } from "@hooks/use-popup";

type UseAddToCartPopupsArgs = {
  addingToCartError: boolean;
  addingToCartIsSuccess: boolean;
  productName: string;
};

export const useAddToCartPopups = ({
  addingToCartError,
  addingToCartIsSuccess,
  productName,
}: UseAddToCartPopupsArgs) => {
  usePopup({
    isActive: addingToCartError,
    message: `Can\`t add product ${productName}`,
    messageType: PopupMessageType.ERROR,
  });
  usePopup({
    isActive: addingToCartIsSuccess,
    message: `Adding product ${productName} is success`,
    messageType: PopupMessageType.INFORMATION,
  });
};
