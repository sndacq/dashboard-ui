import React from 'react';
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

import {
    selectExpense,
    deleteExpenseApi,
    showDialog,
    hideDialog,
    selectDialog,
} from './expenseSlice';


function ExpenseList () {
    const dispatch = useDispatch();
    const expenseData = useSelector(selectExpense, shallowEqual);
    const dialogData = useSelector(selectDialog, shallowEqual);

    const handleDialogClose = () => { dispatch(hideDialog()) };

    const addEntry = () => {
        dispatch(showDialog({effect: 'add'}));
    }

    const confirmDelete = () => {
        handleDialogClose();
        dispatch(deleteExpenseApi(dialogData.activeItem.id));
    }

    let dialogTitle = ''
    const renderDialog = () => {
        switch (dialogData.effect) {
            case 'add':
                dialogTitle = 'Add new entry';
                return (
                    <div>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <ExpenseForm data={false} />
                    </DialogContent>
                    </div>

                );

            case 'edit': 
                dialogTitle = `Edit ${dialogData.activeItem.date} entry`;
                return (
                    <div>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <ExpenseForm data={dialogData.activeItem}/>
                    </DialogContent>
                    </div>

                );

            case 'delete':
                dialogTitle = 'Are you sure you want to delete this entry?';
                return (
                    <div>
                    <DialogTitle>{dialogTitle}</DialogTitle>
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
            default:
        }
    }

    return (
        <div>
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
                    <ExpenseListItem data={expenseData} />
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={dialogData.value} onClose={handleDialogClose}>
            {renderDialog()}
        </Dialog>
        </div>
    );
}

export default ExpenseList;