import React from "react";
import { Switch, Route } from "react-router-dom";

import Expenses from "./Expenses"
import Nutrition from "./Nutrition"
import Mood from "./Mood"


function Body () {
    return (
        <Switch>
            <Route path="/expenses">
                <Expenses />
            </Route>
            <Route path="/nutrition">
                <Nutrition />
            </Route>
            <Route path="/mood">
                <Mood />
            </Route>
        </Switch>
    );   
}

export default Body;