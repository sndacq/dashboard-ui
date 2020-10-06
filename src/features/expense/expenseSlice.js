import { createSlice } from '@reduxjs/toolkit';

import { hideBackdrop, showAlertNotification } from '../core/coreSlice';

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
    categories: {},
    accounts: {},
  },
  reducers: {
    updateExpenseList(state, action) {
      const data = action.payload;
      state.list = data;
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
      data.forEach((category) => {
        state.categories[category.id] = category.name;
      });
    },
    updateAccountList(state, action) {
      const data = action.payload;
      data.forEach((account) => {
        state.accounts[account.id] = account.name;
      });
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

export const fetchExpenseApi = () => async (dispatch) => {
  await getExpense()
    .then((res) => {
      dispatch(updateExpenseList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch expenses'));
    });
  dispatch(hideBackdrop());
};

export const addExpenseApi = (formData) => async (dispatch) => {
  await createExpense(formData)
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
  dispatch(hideBackdrop());
};

export const editExpenseApi = (formData) => async (dispatch) => {
  await updateExpense(formData)
    .then(() => {
      dispatch(editExpense(formData));
      dispatch(showAlertNotification('Entry succesfully updated'));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to update entry'));
    });
  dispatch(hideBackdrop());
};

export const deleteExpenseApi = (id) => async (dispatch) => {
  await deleteExpense(id)
    .then(() => {
      dispatch(removeExpense(id));
      dispatch(showAlertNotification('Entry succesfully deleted'));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to delete entry'));
    });
  dispatch(hideBackdrop());
};

export const fetchCategoryApi = () => async (dispatch) => {
  await getCategory()
    .then((res) => {
      dispatch(updateCategoryList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch categories'));
    });
  dispatch(hideBackdrop());
};

export const fetchAccountApi = () => async (dispatch) => {
  await getAccount()
    .then((res) => {
      dispatch(updateAccountList(res));
    })
    .catch(() => {
      dispatch(showAlertNotification('Failed to fetch accounts'));
    });
  dispatch(hideBackdrop());
};

export const selectExpense = (state) => state.expenses.list;
export const selectCategory = (state) => state.expenses.categories;
export const selectAccount = (state) => state.expenses.accounts;
export const selectDialog = (state) => state.expenses.dialog;

export default expenseSlice.reducer;
