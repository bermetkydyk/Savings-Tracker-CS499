// IncomeNew shows IncomeForm and IncomeReview

import React, { Component } from 'react';
import IncomeForm from './IncomeForm';
import IncomeFormReview from './IncomeFormReview';
import { reduxForm } from 'redux-form';

class IncomeNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if(this.state.showFormReview === true){
            return <IncomeFormReview 
                onCancel={ ()=> this.setState({ showFormReview: false })}
            />;   
        }
        
        return <IncomeForm 
            onIncomeSubmit={ () => this.setState({ showFormReview: true})
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
})(IncomeNew);