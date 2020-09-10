import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { createExpense } from '../api/ExpenseApi'; 

function EntryForm () {
    let today = new Date().toISOString().split('T')[0];

    const [state, setState] = useState({
        date: today,
        amount: '0.00',
        account: '1',
        category: '1',
        expense_type: '1',
      });
    
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        createExpense(state)
        .then(data => {
            console.log(data)
        })
        .catch(err => err);
    };
    
    return(
        <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField 
                name="date" 
                label="Date"
                type="date"
                defaultValue={state.date}
                InputLabelProps={{shrink: true}}
                onChange={handleChange}
            />
            <TextField 
                name="amount" 
                label="Amount"
                value={state.amount}
                onChange={handleChange}
            />
            <FormControl>
                <InputLabel id="account-select-label">Account</InputLabel>
                <Select labelId="account-select-label" name="account"
                value={state.account}
                onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="category">Category</InputLabel>
                <Select labelId="category" name="category"
                value={state.category}
                onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="expense_type">Expense Type</InputLabel>
                <Select labelId="expense_type" name="expense_type"
                value={state.expense_type}
                onChange={handleChange}
                >
                    <MenuItem value={0}>Income</MenuItem>
                    <MenuItem value={1}>Expense</MenuItem>
                    <MenuItem value={3}>Transfer</MenuItem>
                    <MenuItem value={4}>Savings</MenuItem>
                </Select>
            </FormControl>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default EntryForm;