// GoalNew shows GoalForm and GoalReview

import React, { Component } from 'react';
import GoalForm from './GoalForm';
import GoalFormReview from './GoalFormReview';
import { reduxForm } from 'redux-form';

class GoalNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if(this.state.showFormReview === true){
            return <GoalFormReview 
                onCancel={ ()=> this.setState({ showFormReview: false })}
            />;   
        }
        
        return <GoalForm 
            onGoalSubmit={ () => this.setState({ showFormReview: true})
        }/>;
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

export default reduxForm({
    form: 'incomeForm'
})(GoalNew);