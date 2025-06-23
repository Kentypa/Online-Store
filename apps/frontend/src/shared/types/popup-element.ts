import { PopupMessageType } from "@enums/popupMessageType";

export type PopupElement = {
  message: string;
  messageType?: PopupMessageType;
  key?: string | number;
  duration?: number;
  show?: boolean;
};
