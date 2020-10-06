import { createSlice } from '@reduxjs/toolkit';

const coreSlice = createSlice({
  name: 'core',
  initialState: {
    alertNotification: {
      value: false,
      message: '',
    },
    backdrop: false,
  },
  reducers: {
    showAlertNotification(state, action) {
      state.alertNotification = {
        value: true,
        message: action.payload,
      };
    },
    hideAlertNotification(state) {
      state.alertNotification = {
        value: false,
        message: '',
      };
    },
    showBackdrop(state) {
      state.backdrop = true;
    },
    hideBackdrop(state) {
      state.backdrop = false;
    },
  },
});

export const {
  showAlertNotification,
  hideAlertNotification,
  showBackdrop,
  hideBackdrop,
} = coreSlice.actions;

export const selectAlert = (state) => state.core.alertNotification;
export const selectBackdrop = (state) => state.core.backdrop;

export default coreSlice.reducer;
