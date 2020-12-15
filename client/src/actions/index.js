import axios from 'axios';
import { FETCH_USER, FETCH_EXPENSES, FETCH_INCOMES, FETCH_GOALS } from './types';

export const fetchUser = () => {
    return function(dispatch) {
        axios.get('/auth/api/current_user')
            .then(res => dispatch({
                type: FETCH_USER,
                payload: res.data
            }));
    };
};

export const submitIncome = (values, history) => async dispatch => {
    const res = await axios.post('/userIncomes/add/', values);
    history.push('/summary');
    //dispatch({ type: FETCH_USER, palyload: res.data });
};

export const submitExpense = (values, history) => async dispatch => {
    const res = await axios.post('/userExpenses/add/', values);
    history.push('/summary');
};

export const submitGoal = (values, history) => async dispatch => {
    const res = await axios.post('/userGoals/add/', values);
    history.push('/goal');
};

export const fetchExpenses = () => {
    return function(dispatch) {
        axios.get('/userExpenses/currentUser')
            .then(res => dispatch({
                type: FETCH_EXPENSES,
                payload: res.data
            }));
    };
};

export const fetchIncomes = () => {
    return function(dispatch) {
        axios.get('/userIncomes/currentUser')
            .then(res => dispatch({
                type: FETCH_INCOMES,
                payload: res.data
            }));
    };
};

export const fetchGoals = () => {
    return function(dispatch) {
        axios.get('/userGoals/currentUser')
            .then(res => dispatch({
                type: FETCH_GOALS,
                payload: res.data
            }));
    };
};