// IncomeForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import IncomeField from './IncomeField';
import M from "materialize-css";
import IncomeFieldDropdown from './IncomeFieldDropdown';
import IncomeFieldNumber from './IncomeFieldNumber';
import * as actions from '../../actions';


class IncomeForm extends Component {
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
            <Field component={IncomeFieldDropdown} label='Income Type*' name='incomeType' type='text' />
            <Field component={IncomeFieldNumber} label='Amount*' name='realAmount' type='number'/>
            <Field component={IncomeField} label='Description' name='description' type='text' />
            </>
        );
        
    }
    
    render() {
        return (
            <>
                <nav>
                    <div className="nav-wrapper white">
                        <p className="brand-logo center teal-text" style={{margin: "0px"}}>Add Income</p>
                    </div>
                </nav>

                <div className="container" style={{marginTop: "40px"}}>
            
                    <form 
                        onSubmit={this.props.handleSubmit( this.props.onIncomeSubmit )}
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
                                    <i className="material-icons right">done</i>Add
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

    if (!values.incomeType) {
        errors.incomeType = 'You must provide an income type';
    }

    if (!values.realAmount) {
        errors.realAmount = 'You must provide an amount';
    }

    if (isNaN(Number(values.realAmount))) {
        errors.realAmount = 'You must enter a number';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'IncomeForm',
    destroyOnUnmount: false
})(IncomeForm);