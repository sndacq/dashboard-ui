import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Button
} from '@material-ui/core';

import {
    addExpenseApi,
    editExpenseApi,
    selectCategory,
    selectAccount,
    hideDialog
 } from './expenseSlice';


function ExpenseForm (props) {
    const { data } = props;
    const dispatch = useDispatch();

    const categoryList = useSelector(selectCategory);
    const accountList = useSelector(selectAccount);


    const today = new Date().toISOString().split('T')[0];
    const initialState = (data === false) ? 
    {   date: today,
        amount: '0.00',
        account: accountList[0].id,
        category: categoryList[0].id,
        expense_type: '1'
    } : { ...data };

    const [state, setState] = useState(initialState);
    
    const handleFormChange = (event) => {
        const name = event.target.name;
        console.log(state);
        console.log(state);
        setState({
          ...state,
          [name]: event.target.value,
        });
        console.log(state);
      };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(hideDialog());
        const formData = {
            ...state,
        }
        if (data === false) {
            dispatch(addExpenseApi(formData));
        }
        else {
            dispatch(editExpenseApi(formData));
        }
    };

    return(
        <form className="form" noValidate onSubmit={handleFormSubmit}>
        <Grid item xs={6}>
            <TextField
                name="date"
                label="Date"
                type="date"
                defaultValue={state.date}
                InputLabelProps={{shrink: true}}
                onChange={handleFormChange}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                name="amount"
                label="Amount"
                value={state.amount}
                onChange={handleFormChange}
            />
        </Grid>
        <Grid item xs={6}>
            <FormControl>
                <InputLabel id="category">Category</InputLabel>
                <Select labelId="category" name="category"
                value={state.category}
                onChange={handleFormChange}
                >
                    {categoryList.map(category => {
                        return (
                            <MenuItem value={category.id}>
                                {category.name}
                            </MenuItem>)
                        ;
                    })}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl>
                <InputLabel id="account-select-label">Account</InputLabel>
                <Select labelId="account-select-label" name="account"
                value={state.account}
                onChange={handleFormChange}
                >
                    {accountList.map(account => {
                        return(
                            <MenuItem value={account.id}>
                                {account.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl>
                <InputLabel id="expense_type">Expense Type</InputLabel>
                <Select labelId="expense_type" name="expense_type"
                value={state.expense_type}
                onChange={handleFormChange}
                >
                    <MenuItem value={0}>Income</MenuItem>
                    <MenuItem value={1}>Expense</MenuItem>
                    <MenuItem value={3}>Transfer</MenuItem>
                    <MenuItem value={4}>Savings</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <Button color="primary" type="submit">Submit</Button>
        </Grid>
        </form>
    );
}

export default ExpenseForm;