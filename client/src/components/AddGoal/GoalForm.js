// GoalForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import GoalField from './GoalField';
import M from "materialize-css";
import GoalFieldDropdown from './GoalFieldDropdown';
import GoalFieldNumber from './GoalFieldNumber';
import * as actions from '../../actions';
import GoalFieldDatePicker from './GoalFieldDatePicker';


class GoalForm extends Component {
    componentDidMount() {
        let Collapsible = document.querySelectorAll('.collapsible');
        let FormSelect = document.querySelectorAll('select');
        let DatePicker = document.querySelectorAll('.datepicker');
        let options = {
            
        };
        let DatePickerOptions = {
            format: 'mm/dd/yyyy',
            autoClose: true
        };
        M.Collapsible.init(Collapsible, options);
        M.FormSelect.init(FormSelect, options);
        M.Datepicker.init(DatePicker, DatePickerOptions);
        
    }
    renderFields(){
        
        return (
            <>
            <Field component={GoalField} label='Title*' name='title' type='text' />
            <Field component={GoalFieldNumber} label='Amount Needed*' name='amountNeeded' type='number'/>
            <Field component={GoalFieldDropdown} label='Priority*' name='priority' type='number' />
            <Field component={GoalFieldDatePicker} label='Reach by Date*' name='reachByDate' type='date' />
            <Field component={GoalField} label='Description' name='description' type='text' />
            
            
            </>
        );
        
    }
    
    render() {
        return (
            <>
                <nav>
                    <div className="nav-wrapper white">
                        <p className="brand-logo center teal-text" style={{margin: "0px"}}>Add Goal</p>
                    </div>
                </nav>

                <div className="container" style={{marginTop: "40px"}}>
            
                    <form 
                        onSubmit={this.props.handleSubmit( this.props.onGoalSubmit )}
                    >
                        {this.renderFields()}
                        

                        <div className="row">
                            
                            <div className="input-field col s12 m4 offset-m1">
                                <a className="btn btn-large col s12 teal lighten-3" href="/summary">Cancel</a>
                            </div>
                            <div className="input-field col s12 m4 offset-m2">
                                <button 
                                    className="btn btn-large col s12 teal darken-3" 
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

    if (!values.title) {
        errors.title = 'You must provide a title for the goal';
    }

    if (!values.amountNeeded) {
        errors.amountNeeded = 'You must provide an amount';
    }

    if (!values.priority) {
        errors.priority = 'You must choose a priority';
    }

    if (!values.reachByDate) {
        errors.reachByDate= 'You must provide a date';
    }

    if (isNaN(Number(values.amountNeeded))) {
        errors.amountNeeded = 'You must enter a number';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'GoalForm',
    destroyOnUnmount: false
})(GoalForm);