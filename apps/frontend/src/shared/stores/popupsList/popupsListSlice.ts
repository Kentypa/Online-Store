import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupElement } from "@shared-types/popup-element";

const initialState: PopupElement[] = [];

export const popupsListSlice = createSlice({
  name: "popupsList",
  initialState,
  reducers: {
    popupsListPush: (state, action: PayloadAction<PopupElement>) => {
      state.push(action.payload);
    },
    popupsListRemove: (state, action: PayloadAction<string | number>) => {
      return state.filter((popup) => popup.key !== action.payload);
    },
  },
});

export const { popupsListPush, popupsListRemove } = popupsListSlice.actions;

export default popupsListSlice.reducer;
