import React, { useState } from 'react';
import { TextField, FormControl, InputLabel,
         Select, MenuItem, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createExpense } from '../api/ExpenseApi'; 


function EntryForm () {
    const [open, setOpen] = useState({
        value: false,
        message: '',
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen({
            ...state,
            value: false,
        });
    };

    let today = new Date().toISOString().split('T')[0];
    const [state, setState] = useState({
        date: today,
        amount: '0.00',
        account: '1',
        category: '1',
        expense_type: '1',
      });
    
      const handleFormChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        createExpense(state)
        .then(data => {
            if(typeof data.id != "undefined") {
                setOpen({
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
    };

    const showError = message => {
        setOpen({
            message: 'Error creating entry',
            value: true,
        });
        console.log(message)
    }
    // TODO: fix layout
    return(
        <div>
            <form className="form" noValidate onSubmit={handleFormSubmit}>
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    defaultValue={state.date}
                    InputLabelProps={{shrink: true}}
                    onChange={handleFormChange}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    value={state.amount}
                    onChange={handleFormChange}
                />
                <FormControl>
                    <InputLabel id="account-select-label">Account</InputLabel>
                    <Select labelId="account-select-label" name="account"
                    value={state.account}
                    onChange={handleFormChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="category">Category</InputLabel>
                    <Select labelId="category" name="category"
                    value={state.category}
                    onChange={handleFormChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>
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
                <input type="submit" value="Submit"/>
            </form>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open.value}
                autoHideDuration={5000}
                onClose={handleClose}
                message={open.message}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }/>
        </div>
    );
}

export default EntryForm;