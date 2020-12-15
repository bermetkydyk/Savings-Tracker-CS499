// ExpenseForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ExpenseField from './ExpenseField';
import M from "materialize-css";
import ExpenseFieldDropdown from './ExpenseFieldDropdown';
import ExpenseFieldNumber from './ExpenseFieldNumber';
import * as actions from '../../actions';

class ExpenseForm extends Component {
    componentDidMount() {
        let Collapsible = document.querySelectorAll('.collapsible');
        let FormSelect = document.querySelectorAll('select');
        let options = {
            
        };
        
        M.Collapsible.init(Collapsible, options);
        M.FormSelect.init(FormSelect, options);
    }
    renderFields(){
        
        return (
            <>
            <Field component={ExpenseFieldDropdown} label='Expense Type*' name='expenseType' type='text' />
            <Field component={ExpenseFieldNumber} label='Amount*' name='realAmount' type='number'/>
            <Field component={ExpenseField} label='Description' name='description' type='text' />
            </>
        );
        
    }
    
    render() {
        return (
            <>
                <nav>
                    <div className="nav-wrapper white">
                        <p className="brand-logo center teal-text" style={{margin: "0px"}}>Add Expense</p>
                    </div>
                </nav>

                <div className="container" style={{marginTop: "40px"}}>
            
                    <form 
                        onSubmit={this.props.handleSubmit( this.props.onExpenseSubmit )}
                    >
                        {this.renderFields()}
                        

                        <div className="row">
                            
                            <div className="input-field col s12 m4 offset-m1">
                                <a className="btn btn-large waves-effect waves-light col s12 teal lighten-3" href="/summary">Cancel</a>
                            </div>
                            <div className="input-field col s12 m4 offset-m2">
                                <button 
                                    className="btn btn-large waves-effect waves-light col s12 teal darken-3" 
                                    type="submit" 
                                    name="action"
                                    
                                >
                                    <i className="material-icons right">done</i>Next
                                </button>
                            </div>
                        </div>
                    </form>
                
                </div>
            </>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.expenseType) {
        errors.type = 'You must provide an expense type';
    }

    if (!values.realAmount) {
        errors.amount = 'You must provide an amount';
    }

    if (isNaN(Number(values.realAmount))) {
        errors.amount = 'You must enter a number';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'ExpenseForm',
    destroyOnUnmount: false
})(ExpenseForm);