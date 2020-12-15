// ExpenseNew shows ExpenseForm and ExpenseReview
import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseFormReview from './ExpenseFormReview';
import { reduxForm } from 'redux-form';

class ExpenseNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if(this.state.showFormReview === true){
            return <ExpenseFormReview 
                onCancel={ ()=> this.setState({ showFormReview: false })}
            />;   
        }
        
        return <ExpenseForm 
            onExpenseSubmit={ () => this.setState({ showFormReview: true})
        }/>;
    }


    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'expenseForm'
})(ExpenseNew);