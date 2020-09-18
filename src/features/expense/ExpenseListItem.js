import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


function ExpenseListItem (props){
    const {openDialog, data } = props;
    const expenseType = {
        0: 'Income',
        1: 'Expense',
        3: 'Transfer',
        4: 'Savings',
    }

    const handleEdit = (entry) => {
        openDialog({
            value: true,
            activeItem: entry,
            action: 'edit',
        });
    }
    const handleDelete = (entry) => {
        openDialog({
            value: true,
            activeItem: entry,
            action: 'delete',
        });
    }

    const listItems = data.map((entry) => 
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
            <TableCell align="left"> {entry.account.name} </TableCell>
            <TableCell align="left"> {entry.category.name} </TableCell>
            <TableCell align="left"> {expenseType[entry.expense_type]} </TableCell>
            <TableCell align="right" > {entry.amount} </TableCell>
        </TableRow>
    );
    return listItems;
}

export default ExpenseListItem;