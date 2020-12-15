import React, { Component } from 'react';
import styled from "styled-components";
import M from "materialize-css";
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { fetchExpenses, fetchIncomes, fetchGoals } from '../../actions';
import Axios from 'axios';

export const Banner = styled.div`
    height: 200px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
    animation: gradient 25s ease infinite;
    
`
const Greeting = styled.h3`
    color: white;
    margin-top: 0;
    text-align: center;
    padding-top: 40px;
`

const Advice = styled.p`
    margin-top: 0;
    color: white;
    text-align: center;
    padding-top: 10px;
`


class Summary extends Component {
    state = {
        expensesCurrentMonth: [],
        incomesCurrentMonth: [],
        creditCardPaymentCurrentMonth: 0,
        householdCurrentMonth: 0,
        rentCurrentMonth: 0,
        mortgageCurrentMonth: 0,
        loanCurrentMonth: 0,
        insuranceCurrentMonth: 0,
        utilitiesCurrentMonth: 0,
        cashCurrentMonth: 0,
        otherCurrentMonth: 0,
        expenseTotal: 0
    }
    

    componentDidMount() {

        // Initializing MaterializeCSS  javascript component 
        let Collapsible = document.querySelectorAll('.collapsible.expandable');
        let Dropdown = document.querySelectorAll('.dropdown-trigger');
        let collapsOpt = {
            accordion: false
        };
        let dropdownOpt = {
            
        };

        M.Collapsible.init(Collapsible, collapsOpt);
        M.Dropdown.init(Dropdown, dropdownOpt);

        // Fetching data from Database with Aios
        this.props.fetchExpenses();
        this.props.fetchIncomes();
        this.props.fetchGoals();
        Axios.get(`/userExpenses/currentUser/currentMonth`)
            .then(res => {
                const expensesCurrentMonth = res.data;
                this.setState( {expensesCurrentMonth} );
            });

        Axios.get(`/userIncomes/currentUser/currentMonth`)
            .then(res => {
                const incomesCurrentMonth = res.data;
                this.setState( {incomesCurrentMonth} );
            });

    }

    



    // Helper function
    groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
             // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {});
    };

    // Helper function
    reduceByKey = (array, key) => {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
    };

    renderData () {

      

        // Initializing MaterializeCSS  javascript component 
        let Collapsible = document.querySelectorAll('.collapsible.expandable');
        let collapsOpt = {
            accordion: false
        };
        M.Collapsible.init(Collapsible, collapsOpt);
   
    
     
    
        const groupByType = this.groupBy(this.state.expensesCurrentMonth, 'expenseType');
        console.log(groupByType);
        
        const card = groupByType.card;
        let cardTotal = card ? this.reduceByKey(card, 'realAmount') : 0;

        const household = groupByType.household;
        let householdTotal = household ? this.reduceByKey(household, 'realAmount') : 0;

        const rent = groupByType.rent;
        let rentTotal = rent ? this.reduceByKey(rent, 'realAmount') : 0;

        const mortgage = groupByType.mortgage;
        let mortgageTotal = mortgage ? this.reduceByKey(mortgage, 'realAmount') : 0;

        const loan = groupByType.loan;
        let loanTotal = loan ? this.reduceByKey(loan, 'realAmount') : 0;

        const insurance = groupByType.insurance;
        let insuranceTotal = insurance ? this.reduceByKey(insurance, 'realAmount') : 0;

        const utility = groupByType.utility;
        let utilityTotal = utility ? this.reduceByKey(utility, 'realAmount') : 0;

        const other = groupByType.other;
        let otherTotal = other ? this.reduceByKey(other, 'realAmount') : 0;

        const cash = groupByType.cash;
        let cashTotal = cash ? this.reduceByKey(cash, 'realAmount') : 0;

        



        const groupByType2 = this.groupBy(this.state.incomesCurrentMonth, 'incomeType');
        //console.log(groupByType2);

        const salary = groupByType2.salary;
        let salaryTotal = salary ? this.reduceByKey(salary, 'realAmount') : 0;
       
        const cashIncome = groupByType2.cash;
        let cashIncomeTotal = cashIncome ? this.reduceByKey(cashIncome, 'realAmount') : 0;

        const businessIncome = groupByType2.business;
        let businessIncomeTotal = businessIncome ? this.reduceByKey(businessIncome, 'realAmount') : 0;

        const investmentIncome = groupByType2.investment;
        let investmentIncomeTotal = investmentIncome ? this.reduceByKey(investmentIncome, 'realAmount') : 0;
        
        const gifttIncome = groupByType2.gift;
        let gifttIncomeTotal = gifttIncome ? this.reduceByKey(gifttIncome, 'realAmount') : 0;

        const otherIncome = groupByType2.other;
        let otherIncomeTotal = otherIncome ? this.reduceByKey(otherIncome, 'realAmount') : 0;


        let expenseTotal = cardTotal + householdTotal + rentTotal + mortgageTotal + loanTotal + insuranceTotal + utilityTotal + cashTotal + otherTotal;
        let incomeTotal = salaryTotal + cashIncomeTotal + businessIncomeTotal + investmentIncomeTotal + gifttIncomeTotal + otherIncomeTotal;
        let currentMonthBalance = incomeTotal - expenseTotal;
        let suggestedSaving = currentMonthBalance * 0.5;
        let suggestedGoal = currentMonthBalance * 0.3;
        let possibleExpense = currentMonthBalance * 0.2;

        return (
            <>
                
                <ul className="collapsible expandable">
                        <li></li>
                        <li>
                            <div className="collapsible-header"  style={{display: "block"}}>
                                <div className="collection">
                                    <a href="#!" className="collection-item"><span className="badge">$ {incomeTotal}</span>Income</a>
                                </div>
                            </div>
                            <div className="collapsible-body">
                                <div className="collection">
                                    <a href="#!" className="collection-item"><span className="badge">$ {salaryTotal}</span>Salary</a>
                                    <a href="#!" className="collection-item"><span className="badge">$ {cashIncomeTotal}</span>Cash</a>
                                    <a href="#!" className="collection-item"><span className="badge">$ {businessIncomeTotal}</span>Business</a>
                                    <a href="#!" className="collection-item"><span className="badge">$ {investmentIncomeTotal}</span>Investment</a>
                                    <a href="#!" className="collection-item"><span className="badge">$ {gifttIncomeTotal}</span>Gift</a>
                                    <a href="#!" className="collection-item"><span className="badge">$ {otherIncomeTotal}</span>Other</a>
                                </div>
                                
                            </div>
                        </li>

                        <li>
                            <div className="collapsible-header"  style={{display: "block"}}>
                                <div className="collection">
                                    <a href="#!" className="collection-item red-text"><span className="badge red-text">$ {expenseTotal}</span>Expense</a>
                                </div>
                            </div>
                            <div className="collapsible-body">
                                <div className="collection">
                                <a href="#!" className="collection-item"><span className="badge">$ {cardTotal} </span>Credit Card Payment</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {householdTotal} </span>Household</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {rentTotal} </span>Rent</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {mortgageTotal} </span>Mortgage</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {loanTotal} </span>Loan</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {insuranceTotal} </span>Insurance</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {utilityTotal} </span>Utility</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {cashTotal} </span>Cash</a>
                                <a href="#!" className="collection-item"><span className="badge">$ {otherTotal} </span>Other</a>
                            
                                </div>
                                
                            </div>
                        </li>

                        <li>
                            <div className="collapsible-header"  style={{display: "block"}}>
                                <div className="collection">
                                <a href="#!" className="collection-item"><span className="badge">$ {currentMonthBalance}</span>Current Monthly Balance</a>
                                </div>
                            </div>
                        </li>
                        
                    </ul>     
                    <div className="row">
                        <div className="col s12 m12 ">
                            <div className="card-panel teal lighten-1 hoverable z-depth-1">
                                <h4 className="white-text center-align">Good job! You have saved ${currentMonthBalance} this month.</h4>
                                <p></p>
                            </div>
                        </div>
                        
                    </div>
                    {this.renderChartAndTable(suggestedSaving, suggestedGoal, possibleExpense)}
            </>
        );
    }
    

    
    renderSummary() {
        
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:

            let Collapsible = document.querySelectorAll('.collapsible.expandable');
            let Dropdown = document.querySelectorAll('.dropdown-trigger');
            let collapsOpt = {
                accordion: false
            };
            let dropdownOpt = {
                
            };

            
            M.Collapsible.init(Collapsible, collapsOpt);
            M.Dropdown.init(Dropdown, dropdownOpt);
              return (
                <span>
                  <p className="teal-text">Monthly breakdown for: </p> 
                  <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Current month</a>

                  <ul id='dropdown1' className='dropdown-content'>
                        <li><a href="#!">Last month</a></li>
                        <li><a href="#!">Last 3 months</a></li>
                        <li><a href="#!">Year to the day</a></li>
                  </ul>
                  {this.renderData()}
                    
                </span>
              );
        }
    }


    renderChartAndTable(save, goal, expense) {
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:
                const data = {
                    labels: ['Long-term Saving', 'Goals',  'Expenses'],
                    datasets: [
                      {
                        label: 'Suggested Balance Distribution',
                        data: [save, goal, expense],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(75, 192, 192, 0.8)',
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                }
              return (
                    <>
                    
                    <div className="row">
                        <div className="col s12 m4 " style={{marginTop: "25px"}}>
                            <h5 className="teal-text center-align">Suggested Balance Distribution</h5>
                            <table style={{marginTop: "25px"}}>
                                

                                <tbody>
                                <tr className="blue lighten-5">
                                    <td>Long-term Saving</td>
                            
                                    <td>${save}</td>
                                </tr>
                                <tr className="teal lighten-3">
                                    <td >Goals</td>
                                  
                                    <td>${goal}</td>
                                </tr>
                                <tr className="red lighten-5">
                                    <td >Possible Expenses</td>
                            
                                    <td>${expense}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col s12 m8 "><Doughnut data={data} /></div>
                    </div>
                     
                    </>
              );
        }
    }
    
  
    render() {

        return (
            <>
            <div className="container">
                <div className="col s12 m2">
                    <Banner>
                        <Greeting>Hi, <span>{ this.props.auth ? this.props.auth.username : "there"}</span> :)</Greeting>
                        <Advice>Get Paid What You're Worth and Spend Less Than You Earn.</Advice>
                        
                    </Banner>
                    
                    {this.renderSummary()}

                </div>
                
            </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return { auth: state.auth, expenses: state.expenses, incomes: state.incomes, goals: state.goals };
}
  
export default connect(mapStateToProps, { fetchExpenses, fetchIncomes, fetchGoals })(Summary);

