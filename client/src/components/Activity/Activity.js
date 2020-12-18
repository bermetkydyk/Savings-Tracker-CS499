import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchExpenses, fetchIncomes } from '../../actions';
import { Field, reduxForm } from 'redux-form'
import css from './Activity.css'
import M from "materialize-css";
import EditForm from './EditForm';
// var instance = M.Tabs.init(el, options);

class Activity extends Component {
    
    state = {
        incomesArr: [],
        expenseArr: [],
        allIncomesArr: [],
        allExpenseArr: []
    };

    componentDidMount() {
        let tabs = document.querySelectorAll('.tabs');
        
        let options = {
      
        };

        M.Tabs.init(tabs, options);
       

        axios.get(`/userIncomes/currentUser`)
            .then(res => {
                const incomesArr = res.data;
                this.setState( { incomesArr });
            })

        axios.get(`/userExpenses/currentUser`)
            .then(res => {
                const expenseArr = res.data;
                this.setState( { expenseArr });
            })
        
        axios.get(`/userIncomes/currentUser`)
            .then(res => {
                const allIncomesArr = res.data;
                this.setState( { allIncomesArr });
            })

        axios.get(`/userExpenses/currentUser`)
            .then(res => {
                const allExpenseArr = res.data;
                this.setState( { allExpenseArr });
            })

    }
    
    formateOutput(type){
        switch(type){
            case 'card':
                return "credit card payment";
            case 'mortgage':
                return "mortgage";
            case 'other':
                return "other";
            default:
                return type;
        }
    }

    deleteExpense(id, e){
        axios.delete(`/userExpenses/remove/${id}`)
            .then(res => {
                console.log(res);
                console.log("Deletion:",res.data);
                const expenseArr = this.state.expenseArr.filter(item => item.expenseId !== id);
                this.setState( { expenseArr });
            })
    }

    deleteIncome(id, e){
        axios.delete(`/userIncomes/remove/${id}`)
            .then(res => {
                console.log(res);
                console.log("Deletion:",res.data);
                const incomesArr = this.state.incomesArr.filter(item => item.incomeId !== id);
                this.setState( { incomesArr });
            })
    }


    renderExpenses(){
        //console.log(this.props);
        let modal = document.querySelectorAll('.modal');
        let selecter = document.querySelectorAll('select');
        let autocomplete = document.querySelectorAll('.autocomplete');
        let modalOpt = {
      
        };
        let selecterOpt = {
      
        };
        let autocompleteOpt = {
            data: {
                "card": null,
                "household": null,
                "rent": null,
                "mortgage": null
            }
        };
        M.Modal.init(modal, modalOpt);
        M.FormSelect.init(selecter, selecterOpt);
        M.Autocomplete.init(autocomplete, autocompleteOpt);

        return(
            
            this.state.expenseArr.map(expense => (
                <>
                    <div className='card darken-1' key={expense.expenseId}>
                        <div className="card-content">
                            <p className="card-title teal-text">Expense for {this.formateOutput(expense.expenseType)}<span className="badge deep-orange-text" style={{fontSize: "25px"}}>${expense.realAmount}</span></p>
                            <p>Description: {expense.description}
                                <span className="badge teal-text">
                                
                                   
                                </span>
                            </p>
                            <p>Created At: {expense.createdAt}
                                <span className="badge">
                                    <button className="modal-trigger  btn white-text" href={'#EditModal'+ expense.expenseId} style={{fontWeight: "bold", marginRight: "15px"}}>Edit</button>
                                    <button className="modal-trigger btn white-text" href={'#DeleteModal'+ expense.expenseId} style={{fontWeight: "bold"}}>Delete</button>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div id={'EditModal'+ expense.expenseId} class="modal">
                        <div class="modal-content">
                        <h4 className="teal-text">Edit</h4>
                            
                            <div class="row">
                                <form class="col s12">
                                <div class="row">
                                    <div  class="input-field col s12">
                                   
                                    <label className = "active">Expense Type</label>
                                   
                                    <select style={{ marginBottom: "5px"}} value={expense.expenseType}>
                                        <option value="" disabled selected>Choose an expense type</option>
                                        <option value="card">Credit Card Payment</option>
                                        <option value="household">Household</option>
                                        <option value="rent">Rent</option>
                                        <option value="mortgage">Mortgage</option>
                                        <option value="loan">Loan</option>
                                        <option value="insurance">Insurance</option>
                                        <option value="utility">Utilities</option>
                                        <option value="cash">Cash</option>
                                        <option value="other">Other</option>
                                    </select>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                    
                                    <input value = {expense.realAmount} id="expenseAmountField" type="number" class="validate"/>
                                    <label class="active" for="expenseAmountField">Amount</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                    <input value = {expense.description} id="expenseDescriptionField" type="text" class="validate" />
                                    <label class="active" for="description">Description</label>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a className="teal-text" onClick={(e) => this.deleteExpense(expense.expenseId, e)} style={{ cursor:"pointer", marginRight:"20px"}}>Save</a>
                            <a className="black-text" href="#!" style={{ cursor:"pointer", marginRight:"20px"}}>Cancel</a>
                        </div>
                    </div>

                    <div id={'DeleteModal'+ expense.expenseId} class="modal">
                        <div class="modal-content">
                        <h4 class = "center-align teal-text">Do you want to delete this record?</h4>
                        </div>
                        <div class="modal-footer">
                                <a className="teal-text" onClick={(e) => this.deleteExpense(expense.expenseId, e)} style={{ cursor:"pointer", marginRight:"20px"}}>Confirm</a>
                                <a className="black-text" href="#!" style={{ cursor:"pointer", marginRight:"20px"}}>Cancel</a>
                        </div>
                    </div>

                
                </>
            )
            )
        
        
        ) 
    }

    renderIncomes(){
        //console.log(this.props);
        return this.state.incomesArr.map(income => {
            return (
                
                <div className='card darken-1' key={income.incomeId}>
                    <div className="card-content">
                        <p className="card-title teal-text">Income from {this.formateOutput(income.incomeType)}<span className="badge teal-text" style={{fontSize: "25px"}}>${income.realAmount}</span></p>
                        <p>Description: {income.description}</p>
                        <p>Created At: {income.createdAt}
                            <span className="badge">
                                <button className="btn btn-danger whilt-text" style={{fontWeight: "bold", marginRight: "15px"}}>Edit</button>
                                <button className="btn btn-danger" onClick={(e) => this.deleteIncome(income.incomeId, e)} style={{fontWeight: "bold"}}>Delete</button>
                            </span>
                        </p>
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
                    <p className="brand-logo center teal-text" style={{margin: "0px"}}>Activity</p>
                </div>
            </nav>

            <section className="container section" id="services">
                <div className="row">
                      <div className="col s12 16 offset-12" style={{marginTop: "50px"}}>
                          <ul className="tabs">
                              <li className="tab col s6">
                                  <a href="#expense" className="teal-text">Expense</a>
                                  

                              </li>
                              <li className="tab col s6">
                                  <a href="#income" className="teal-text">Income</a>

                              </li>

                            </ul>
                            <div className="col s12" id="expense">
                                {this.renderExpenses()}
                            </div>
                            <div className="col s12" id="income">
                                {this.renderIncomes()}
                            </div>
                            
                    </div>
                    </div>
                    
                </section>
                </>
            
        );
    }
}


function mapStateToProps(state) {
    console.log(state);
    return { expenses: state.expenses, incomes: state.incomes };
}

export default connect(mapStateToProps, { fetchExpenses, fetchIncomes })(Activity);
