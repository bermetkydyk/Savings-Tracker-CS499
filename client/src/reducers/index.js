import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import expensesReducer from './expensesReducer';
import incomeReducer from './incomeReducer';
import goalReducer from './goalReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    expenses: expensesReducer,
    incomes: incomeReducer,
    goals: goalReducer
});