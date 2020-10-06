import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../features/core/Header';
import Footer from '../features/core/Footer';
import Dashboard from '../features/core/Dashboard';
import AlertNotification from '../features/core/AlertNotification';
import AppBackdrop from '../features/core/AppBackdrop';

import Expenses from '../features/expense/Expenses';
import {
  fetchExpenseApi,
  fetchCategoryApi,
  fetchAccountApi,
} from '../features/expense/expenseSlice';
import { showBackdrop } from '../features/core/coreSlice';

import Nutrition from '../features/nutrition/Nutrition';
import Mood from '../features/mood/Mood';

import './style.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showBackdrop());
    dispatch(fetchExpenseApi());
    dispatch(fetchCategoryApi());
    dispatch(fetchAccountApi());
  });

  return (
    <div className="main">
      <Router>
        <Header className="header" />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
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
          <AppBackdrop />
        </div>
        <AlertNotification />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
