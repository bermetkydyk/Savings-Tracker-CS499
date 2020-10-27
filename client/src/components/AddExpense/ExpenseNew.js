// ExpenseNew shows ExpenseForm and ExpenseReview

import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';

class ExpenseNew extends Component {
    render() {
        return (
            <div>
                <ExpenseForm />
            </div>
        );
    }
}

export default ExpenseNew;