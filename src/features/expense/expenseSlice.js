import { createSlice } from '@reduxjs/toolkit';

import { getExpense } from '../../api/ExpenseApi';


const expenseSlice = createSlice({
    name: 'expense',
    initialState: [],
    reducers: {
        updateExpenseList(state, action) {
            const data = action.payload;
            data.map(element => state.push(element));
        },
        addExpense(state, action) {
            const { data } = action.payload;
            state.push(data)
        },
    }
});

export const { updateExpenseList, addExpense } = expenseSlice.actions;

export const fetchExpense = () => dispatch => {
    getExpense()
    .then(res => {
        dispatch(updateExpenseList(res));
    })
    .catch(err => {
        console.log(err);
    });
  };

export const selectExpense = state => state.expenses;

export default expenseSlice.reducer;