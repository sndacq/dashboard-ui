import { createSlice } from '@reduxjs/toolkit';

const coreSlice = createSlice({
    name: 'core',
    initialState: {
        alertNotification: {
            value: false,
            message: '',
        },
        appDialog: {
            value: false,
        }
    },
    reducers: {
        showAlertNotification(state, action) {
            state.alertNotification =  { 
                value: true,
                message: action.payload
             }
        },
        hideAlertNotification(state) {
            state.alertNotification =  { 
                value: false,
                message: ''
            }
        },
        showAppDialog(state, action) {
            const { effect, activeItem } = action.payload;
            state.appDialog = {
                value: true,
                activeItem,
                effect,
            }
        },
        hideAppDialog(state) {
            state.appDialog = {
                value: false,
                activeItem: {},
                effect: '',
            }
        }
    }
});

export const { 
    showAlertNotification, 
    hideAlertNotification,
    showAppDialog,
    hideAppDialog,
} = coreSlice.actions;

export const selectAlert = state => state.core.alertNotification;
export const selectDialog = state => state.core.appDialog;

export default coreSlice.reducer;