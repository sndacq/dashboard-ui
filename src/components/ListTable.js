import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function ListTable (props) {
    return (
        <TableContainer component={Paper}>
            <Table striped bordered hover variant="dark">
                <TableHead>
                    <TableRow>
                        <TableCell> Date </TableCell>
                        <TableCell> Expense Type </TableCell>
                        <TableCell> Amount </TableCell>
                        <TableCell> Account </TableCell>
                        <TableCell> Category </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ListItem data={props.data}/>
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function ListItem (props){
    const listItems = props.data.map((entry) => 
        <TableRow>
            <TableCell> {entry.date} </TableCell>
            <TableCell> {entry.expense_type} </TableCell>
            <TableCell> {entry.amount} </TableCell>
            <TableCell> {entry.account} </TableCell>
            <TableCell> {entry.category} </TableCell>
        </TableRow>
    );
    return listItems;
}

export default ListTable;