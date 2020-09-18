import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import AddIcon from '@material-ui/icons/Add';

import ExpenseForm from './ExpenseForm';
import ExpenseListItem from './ExpenseListItem';

import { selectExpense } from './expenseSlice';
import { showAlertNotification } from '../core/coreSlice';
import { deleteExpense } from '../../api/ExpenseApi';


function ExpenseList () {
    const dispatch = useDispatch();
    const expenseData = useSelector(selectExpense, shallowEqual);

    const confirmDelete = () => {
        let message = 'Successfully deleted entry';
        handleDialogClose();
        deleteExpense(openDialog.activeItem.id)
        .then(data => {
            console.log(data)
            dispatch(showAlertNotification(message));
        })
        .catch(err => {
            console.log(err);
            message = 'Failed to delete entry';
            dispatch(showAlertNotification(message));
        });
    }

    const [openDialog, setOpenDialog] = useState({
        value: false,
        activeItem: {},
        action: '',
    })

    const handleDialogClose = () => {
        setOpenDialog({
            value: false,
            activeItem: {},
            action: '',
        });
    }

    const addEntry = () => {
        setOpenDialog({
            value: true,
            activeItem: {},
            action: 'add',
        });
    }

    const dialogContent = () => {
        if (openDialog.action === 'add') {
            return (
                <div>
                    <DialogTitle id="alert-dialog-title">
                        {"Add new entry"}
                    </DialogTitle>
                    <DialogContent>
                        <ExpenseForm
                            data={false}
                            handleDialogClose={handleDialogClose}
                        />
                    </DialogContent>
                </div>            );
        }
        else if (openDialog.action === 'edit') {
            return (
                <div>
                    <DialogTitle id="alert-dialog-title">
                        {`Edit ${openDialog.activeItem.date} entry`}
                    </DialogTitle>
                    <DialogContent>
                        <ExpenseForm
                            data={openDialog.activeItem}
                            handleDialogClose={handleDialogClose}
                        />
                    </DialogContent>
                </div>
            );
        }
        else if (openDialog.action === 'delete') {

            return (
                <div>
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this entry?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        No
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
                </div>
            );
        }
    }

    return (
        <div>
        <Dialog
            id="dialog"
            open={openDialog.value}
            onClose={handleDialogClose}
        >
            {dialogContent()}
        </Dialog>
        <Paper>
            <Button color="primary" onClick={addEntry}>
                Add new entry <AddIcon />
            </Button>
        </Paper>
        <TableContainer component={Paper}>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Actions</TableCell>
                        <TableCell align="left"> Date </TableCell>
                        <TableCell align="left"> Account </TableCell>
                        <TableCell align="left"> Category </TableCell>
                        <TableCell align="left"> Expense Type </TableCell>
                        <TableCell align="right"> Amount </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ExpenseListItem 
                        data={expenseData} 
                        openDialog={setOpenDialog}
                    />
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

export default ExpenseList;