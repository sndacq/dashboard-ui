import { createSlice } from '@reduxjs/toolkit';

const coreSlice = createSlice({
    name: 'core',
    initialState: {
        alertNotification: {
            value: false,
            message: '',
        }
    },
    reducers: {
        showAlertNotification(state, action) {
            state.alertNotification =  { 
                value: true,
                message: action.payload
             }
        },
        hideAlertNotification(state, action) {
            state.alertNotification =  { 
                value: false,
                message: ''
            }
        }
    }
});

export const { showAlertNotification, hideAlertNotification } = coreSlice.actions;

export const selectAlert = state => state.core.alertNotification;

export default coreSlice.reducer;