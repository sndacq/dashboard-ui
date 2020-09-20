import { createSlice } from '@reduxjs/toolkit';

import { getExpense } from '../../api/ExpenseApi';


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
            const { data } = action.payload;
            state.list.push(data)
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
    showDialog,
    hideDialog,
} = expenseSlice.actions;

export const fetchExpense = () => dispatch => {
    getExpense()
    .then(res => {
        dispatch(updateExpenseList(res));
    })
    .catch(err => {
        console.log(err);
    });
  };

export const selectExpense = state => state.expenses.list;
export const selectDialog = state => state.expenses.dialog;

export default expenseSlice.reducer;