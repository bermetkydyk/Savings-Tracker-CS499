import React from 'react';
import {reduxForm, Field} from 'redux-form';

const renderInput = (props) => (
    <input {...props.input} type="text" />
)

const onSubmit = values => {
    alert(JSON.stringify(values));
}


const ReduxForm = ({handleSubmit}) => (
    <div>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
            <Field
                name="customer-id"
                component={renderInput}
            />
            <div className="row">
                            
                            <div className="input-field col s12 m4 offset-m1">
                                <a className="btn btn-large waves-effect waves-light col s12 teal lighten-3" href="#!">Cancel</a>
                            </div>
                            <div className="input-field col s12 m4 offset-m2">
                                <button 
                                    className="btn btn-large waves-effect waves-light col s12 teal darken-3" 
                                    type="submit" 
                                    name="action"
                                    
                                >
                                    <i className="material-icons right">done</i>Save
                                </button>
                            </div>
            </div>
        </form>
    </div>
)


export default reduxForm({
    form: 'activity-edit-expense-form',
    onSubmit,
})(ReduxForm);