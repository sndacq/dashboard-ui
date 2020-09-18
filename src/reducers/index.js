import { combineReducers } from 'redux'
import expenseReducer from '../features/expense/expenseSlice'


const rootReducer = combineReducers({
  expenses: expenseReducer,
})

export default rootReducer;