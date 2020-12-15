import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExpenses, fetchIncomes, fetchGoals } from '../../actions';

import M from "materialize-css";

class Goal extends Component {
  
    componentDidMount() {
        // Initializing MaterializeCSS  javascript component 
        //let tabs = document.querySelectorAll('.tabs');
        //let options = {
      
        //};  
        //M.Tabs.init(tabs, options);

        // Fetching data from Database with Aios
        this.props.fetchExpenses();
        this.props.fetchIncomes();
        this.props.fetchGoals();
    }
    
    renderGoals(){
        //console.log(this.props);
        return this.props.goals.map(goal => {
            return (
                <div className="container">
                    <div className='card darken-1' key={goal.goalId}>
                        <div className="card-content">
                            <span className="card-title">Goal: {goal.title}</span>
                            <p>Amount Needed: {goal.amountNeeded}</p>
                            <p>Description: {goal.description}</p>
                            <p>Reach by Date: {goal.reachByDate}</p>
                            <p>Priority: {goal.priority}</p>
                            <p>Created At: {goal.createdAt}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {

        return (
            <>
                <nav>
                    <div className="nav-wrapper white">
                        <p className="brand-logo center teal-text" style={{margin: "0px"}}>Goal</p>
                    </div>
                </nav>
                {this.renderGoals()}
               
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { expenses: state.expenses, incomes: state.incomes, goals: state.goals };
}

export default connect(mapStateToProps, { fetchExpenses, fetchIncomes, fetchGoals })(Goal);