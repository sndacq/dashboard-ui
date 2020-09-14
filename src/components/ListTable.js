import React, { useState } from 'react';

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

import { IconButton, Snackbar } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import EntryForm from './EntryForm';
import { deleteExpense } from '../api/ExpenseApi'


function ListTable (props) {

    const [openSnackBar, setOpenSnackBar] = useState({
        value: false,
        message: '',
    });

    const handleSnackBarClose = () => {
        setOpenSnackBar({
            value: false,
            message: '',
        });
    }

    const confirmDelete = () => {
        handleDialogClose();
        deleteExpense(openDialog.activeItem.id)
        .then(data => {
            console.log(data)
            setOpenSnackBar({
                value: true,
                message: 'Successfully deleted entry',
            });
        })
        .catch(err => {
            console.log(err);
            setOpenSnackBar({
                value: true,
                message: 'Failed to delete entry',
            });
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
        });
    }

    const dialogContent = () => {
        if (openDialog.action === 'add') {
            return (
                <div>
                    <DialogTitle id="alert-dialog-title">
                        {"Add new enrty"}
                    </DialogTitle>
                    <DialogContent>
                        <EntryForm
                            data={false}
                            handleDialogClose={handleDialogClose}
                            setOpenSnackBar={setOpenSnackBar}
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
                        <EntryForm
                            data={openDialog.activeItem}
                            handleDialogClose={handleDialogClose}
                            setOpenSnackBar={setOpenSnackBar}
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
            id="delete-dialog"
            open={openDialog.value}
            onClose={handleDialogClose}
        >
            {dialogContent()}
        </Dialog>


        <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackBar.value}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
                message={openSnackBar.message}
                action={
                <React.Fragment>
                    <IconButton size="small" color="inherit" onClick={handleSnackBarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
        }/>
    

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
                    <ListItem 
                        data={props.data} 
                        openDialog={setOpenDialog}
                    />
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );

}

function ListItem (props){

    const handleEdit = (entry) => {
        props.openDialog({
            value: true,
            activeItem: entry,
            action: 'edit',
        });
    }
    const handleDelete = (entry) => {
        props.openDialog({
            value: true,
            activeItem: entry,
            action: 'delete',
        });
    }

    const listItems = props.data.map((entry) => 
        <TableRow key={entry.id}>
            <TableCell align="center">
                <IconButton onClick={() =>{ handleEdit(entry) }}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() =>{ handleDelete(entry) }}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>

            <TableCell align="left"> {entry.date} </TableCell>
            <TableCell align="left"> {entry.account} </TableCell>
            <TableCell align="left"> {entry.category} </TableCell>
            <TableCell align="left"> {entry.expense_type} </TableCell>
            <TableCell align="right" > {entry.amount} </TableCell>
        </TableRow>
    );
    return listItems;
}

export default ListTable;