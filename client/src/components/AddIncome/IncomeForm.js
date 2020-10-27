// IncomeForm shows a form for a user to add input

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import IncomeField from './IncomeField';


class IncomeForm extends Component {
    
    renderFields(){
        return (
            <div>
                <Field label="Income Type" type="text" name="title" component={IncomeField} />
                <Field label="Amount" type="text" name="title" component={IncomeField} />
                <Field label="Tag" type="text" name="title" component={IncomeField} />
                <Field label="Notes" type="text" name="title" component={IncomeField} />
                <Field label="Income Type" type="text" name="title" component={IncomeField} />
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(values=> console.log(values))}
                >
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'IncomeForm'
})(IncomeForm);