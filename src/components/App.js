import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from "../features/core/Header";
import Footer from "../features/core/Footer";

import Expenses from "../features/expense/Expenses";
import { fetchExpense } from "../features/expense/expenseSlice";

import Nutrition from "../features/nutrition/Nutrition";
import Mood from "../features/mood/Mood";

import  "./style.css";

function App () {
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(fetchExpense());
    });

    return (
        <Router>
        <Header />
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
        <Footer />
        </Router>
    );
}

export default App;