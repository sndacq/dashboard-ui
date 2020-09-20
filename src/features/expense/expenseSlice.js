import { createSlice } from '@reduxjs/toolkit';

import { showAlertNotification } from '../core/coreSlice';

import {
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
} from '../../api/ExpenseApi';


const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        list: [],
        dialog: {
            value: false,
        }
    },
    reducers: {
        updateExpenseList(state, action) {
            const data = action.payload;
            data.map(element => state.list.push(element));
        },
        addExpense(state, action) {
            const data = action.payload;
            state.list.push(data)
        },
        editExpense(state, action) {
            const data = action.payload;
            const entryIndex = state.list.findIndex(item => item.id === data.id);
            state.list[entryIndex] = data ;
        },
        removeExpense(state, action) {
            const id = action.payload;
            const filteredList = state.list.filter(item => item.id !== id);
            state.list = filteredList;
        },
        showDialog(state, action) {
            const { effect, activeItem } = action.payload;
            state.dialog = {
                value: true,
                activeItem,
                effect,
            }
        },
        hideDialog(state) {
            state.dialog = {
                value: false,
                activeItem: {},
                effect: '',
            }
        }
    }
});

export const {
    updateExpenseList,
    addExpense,
    editExpense,
    removeExpense,
    showDialog,
    hideDialog,
} = expenseSlice.actions;

export const fetchExpenseApi = () => dispatch => {
    getExpense()
    .then(res => {
        dispatch(updateExpenseList(res));
    })
    .catch(err => {
        console.log(err);
    });
};

export const addExpenseApi = (formData) => dispatch => {
    createExpense(formData)
    .then(res => {
        dispatch(addExpense({
            ...res,
            ...formData,
        }));
        dispatch(showAlertNotification('Entry succesfully created'));
        console.log(res);
    })
    .catch(err => {
        dispatch(showAlertNotification('Failed to create entry'));
        console.log(err);
    });
};

export const editExpenseApi = (formData) => dispatch => {
    updateExpense(formData)
    .then(res => {
        dispatch(editExpense(formData));
        dispatch(showAlertNotification('Entry succesfully updated'));
        console.log(res)
    })
    .catch(err => {
        dispatch(showAlertNotification('Failed to update entry'));
        console.log(err);
    });
};

export const deleteExpenseApi = (id) => dispatch => {
    deleteExpense(id)
    .then(res => {
        dispatch(removeExpense(id));
        dispatch(showAlertNotification('Entry succesfully deleted'));
        console.log(res);
    })
    .catch(err => {
        dispatch(showAlertNotification('Failed to delete entry'));
        console.log(err);
    });
};

export const selectExpense = state => state.expenses.list;
export const selectDialog = state => state.expenses.dialog;

export default expenseSlice.reducer;