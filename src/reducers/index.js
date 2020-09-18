import { combineReducers } from 'redux';
import expenseReducer from '../features/expense/expenseSlice';
import coreReducer from '../features/core/coreSlice';


const rootReducer = combineReducers({
  core: coreReducer,
  expenses: expenseReducer,
})

export default rootReducer;