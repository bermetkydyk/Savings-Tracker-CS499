// ExpenseFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import * as actions from '../../actions';
import { withRouter} from 'react-router-dom';

const GoalFormReview = ( { onCancel, formValues, submitGoal, userId, history }) => {
    
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
  
    formValues['userId'] = userId;
    formValues['incomeMonth'] = month;
    formValues['incomeYear'] = year;
    console.log(formValues);

    return (
        <>
            <nav>
                <div className="nav-wrapper white">
                    <p className="brand-logo center teal-text" style={{margin: "0px"}}>Add Goal</p>
                </div>
            </nav>
            <div className="container" style={{marginTop: "40px"}}>
                <h5>Please confirm your entries</h5>
                <div>
                    <div>
                        <label>Title*</label>
                        <div>{formValues.title}</div>
                    </div>
                    <div>
                        <label>Amount Needed*</label>
                        <div>{formValues.amountNeeded}</div>
                    </div>
                    <div>
                        <label>Description</label>
                        <div>{formValues.description}</div>
                    </div>
                    <div>
                        <label>Description</label>
                        <div>{formValues.reachByDate}</div>
                    </div>
                    <div>
                        <label>Priority</label>
                        <div>{formValues.priority}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12 m4 offset-m1">
                        <button className="btn btn-large waves-effect waves-light col s12 teal lighten-3" onClick={ onCancel }>Back</button>
                    </div>
                    <div className="input-field col s12 m4 offset-m2">
                        <button 
                            className="btn btn-large waves-effect waves-light col s12 teal darken-3" 
                            type="submit" 
                            name="action"   
                            onClick={ () => submitGoal(formValues, history)}                     
                        >
                            <i className="material-icons right">done</i>Add
                        </button>
                    </div>
                </div>

            </div>
            
        </>
    );
};

function mapStateToProps(state) {
    console.log(state);

    return {
        formValues: state.form.GoalForm.values,
        userId: state.auth.id
    };
}

export default connect(mapStateToProps, actions)(withRouter(GoalFormReview));