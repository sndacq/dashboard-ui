import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
    selectCategory,
    selectAccount,
    showDialog
} from './expenseSlice';

function ExpenseListItem (props) {
    const { data } = props;

    const dispatch = useDispatch();

    const categoryList = useSelector(selectCategory);
    const accountList = useSelector(selectAccount);

    const accountDictionary = {};
    accountList.map(account => accountDictionary[account.id] = account.name);

    const categoryDictionary = {};
    categoryList.map(category => accountDictionary[category.id] = category.name);

    const expenseType = {
        0: 'Income',
        1: 'Expense',
        3: 'Transfer',
        4: 'Savings',
    }

    const handleEdit = (entry) => {
        dispatch(
            showDialog({
                effect: 'edit',
                activeItem: entry,
            })
        );
    }
    const handleDelete = (entry) => {
        dispatch(
            showDialog({
                effect: 'delete',
                activeItem: entry,
            })
        );
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
            <TableCell align="left"> {accountDictionary[entry.account]} </TableCell>
            <TableCell align="left"> {categoryDictionary[entry.category]} </TableCell>
            <TableCell align="left"> {expenseType[entry.expense_type]} </TableCell>
            <TableCell align="right" > {entry.amount} </TableCell>
        </TableRow>
    );
    return listItems;
}

export default ExpenseListItem;