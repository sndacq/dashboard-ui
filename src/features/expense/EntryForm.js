import React, { useState } from 'react';
import { TextField, FormControl, InputLabel,
         Select, MenuItem, Grid, Button } from '@material-ui/core';
import { createExpense, updateExpense } from '../../api/ExpenseApi';

function EntryForm (props) {
    const today = new Date().toISOString().split('T')[0];
    const initialState = (props.data === false) ? 
    {   date: today,
        amount: '0.00',
        account: {
            id: '1',
            name: 'TestAccount'
        },
        category: {
            id: '1',
            name: 'TestCategory',
        },
        expense_type: '1'
    } : 
    {
        ...props.data,
    };
    const [state, setState] = useState(initialState);
    
      const handleFormChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };


      const handleFormSubmit = (event) => {
        event.preventDefault();
        props.handleDialogClose();
        const formData = {
            ...state,
            account: state.account.id,
            category: state.category.id,
        }
        if (props.data === false) {
            createExpense(formData)
            .then(data => {
                if(typeof data.id != "undefined") {
                    props.setOpenSnackBar({
                        message: 'Entry succesfully created',
                        value: true,
                    });
                    console.log(data)
                }
                else {
                    showError(data)
                }
        
            })
            .catch(err => showError(err));
        }
        else {
            updateExpense(formData)
            .then(data => {
                if(typeof data.id != "undefined") {
                    props.setOpenSnackBar({
                        message: 'Entry succesfully updated',
                        value: true,
                    });
                    console.log(data)
                }
                else {
                    showError(data)
                }
        
            })
            .catch(err => showError(err));
        }
    };

    const showError = message => {
        props.setOpenSnackBar({
            message: message,
            value: true,
        });
        console.log(message)
    }

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
                <InputLabel id="account-select-label">Account</InputLabel>
                <Select labelId="account-select-label" name="account"
                value={state.account.id}
                onChange={handleFormChange}
                >
                    <MenuItem value={1}>{state.account.name}</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl>
                <InputLabel id="category">Category</InputLabel>
                <Select labelId="category" name="category"
                value={state.category.id}
                onChange={handleFormChange}
                >
                    <MenuItem value={1}>{state.category.name}</MenuItem>
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

export default EntryForm;