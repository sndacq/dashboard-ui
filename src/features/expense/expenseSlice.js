import { createSlice } from '@reduxjs/toolkit';

import { showAlertNotification } from '../core/coreSlice';

import {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getCategory,
  getAccount,
} from '../../api/ExpenseApi';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    list: [],
    dialog: {
      value: false,
    },
    categories: [],
    accounts: [],
  },
  reducers: {
    updateExpenseList(state, action) {
      const data = action.payload;
      data.map((element) => state.list.push(element));
    },
    addExpense(state, action) {
      const data = action.payload;
      state.list.push(data);
    },
    editExpense(state, action) {
      const data = action.payload;
      const entryIndex = state.list.findIndex((item) => item.id === data.id);
      state.list[entryIndex] = data;
    },
    removeExpense(state, action) {
      const id = action.payload;
      const filteredList = state.list.filter((item) => item.id !== id);
      state.list = filteredList;
    },
    updateCategoryList(state, action) {
      const data = action.payload;
      data.map((element) => state.categories.push(element));
    },
    updateAccountList(state, action) {
      const data = action.payload;
      data.map((element) => state.accounts.push(element));
    },
    showDialog(state, action) {
      const { effect, activeItem } = action.payload;
      state.dialog = {
        value: true,
        activeItem,
        effect,
      };
    },
    hideDialog(state) {
      state.dialog = {
        value: false,
        activeItem: {},
        effect: '',
      };
    },
  },
});

export const {
  updateExpenseList,
  addExpense,
  editExpense,
  removeExpense,
  updateCategoryList,
  updateAccountList,
  showDialog,
  hideDialog,
} = expenseSlice.actions;

export const fetchExpenseApi = () => (dispatch) => {
  getExpense()
    .then((res) => {
      dispatch(updateExpenseList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch expenses'));
    });
};

export const addExpenseApi = (formData) => (dispatch) => {
  createExpense(formData)
    .then((res) => {
      dispatch(addExpense({
        ...res,
        ...formData,
      }));
      dispatch(showAlertNotification('Entry succesfully created'));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to create entry'));
    });
};

export const editExpenseApi = (formData) => (dispatch) => {
  updateExpense(formData)
    .then(() => {
      dispatch(editExpense(formData));
      dispatch(showAlertNotification('Entry succesfully updated'));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to update entry'));
    });
};

export const deleteExpenseApi = (id) => (dispatch) => {
  deleteExpense(id)
    .then(() => {
      dispatch(removeExpense(id));
      dispatch(showAlertNotification('Entry succesfully deleted'));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to delete entry'));
    });
};

export const fetchCategoryApi = () => (dispatch) => {
  getCategory()
    .then((res) => {
      dispatch(updateCategoryList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch categories'));
    });
};

export const fetchAccountApi = () => (dispatch) => {
  getAccount()
    .then((res) => {
      dispatch(updateAccountList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch accounts'));
    });
};

export const selectExpense = (state) => state.expenses.list;
export const selectCategory = (state) => state.expenses.categories;
export const selectAccount = (state) => state.expenses.accounts;
export const selectDialog = (state) => state.expenses.dialog;

export default expenseSlice.reducer;
