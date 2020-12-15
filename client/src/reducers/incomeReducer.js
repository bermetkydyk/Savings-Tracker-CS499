import { FETCH_INCOMES } from '../actions/types';

export default function(state = [], action) {
    switch (action.type){
        case FETCH_INCOMES:
            return action.payload || false;
        default:
            return state;
    }
}