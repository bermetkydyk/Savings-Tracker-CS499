// ExpenseForm shows a form for a user to add input

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class ExpenseForm extends Component {
    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(values=> console.log(values))}
                >
                    <Field 
                        type="text"
                        name="incomeTitle"
                        component="input"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'ExpenseForm'
})(ExpenseForm);