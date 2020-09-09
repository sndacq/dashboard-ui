import React from 'react';
// import { Switch, Route } from "react-router-dom";

import ListTable from './ListTable';


function Expenses () {
    return (
        <ListTable data={data}/>
        // <Switch>
        //     <Route path="/list">
        //         <ListTable data={data}/>
        //     </Route>
        //     <Route path="/calendar">
        //         <p>calendar view</p>
        //     </Route>
        // </Switch>
    );
}

export default Expenses;