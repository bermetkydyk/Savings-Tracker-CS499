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
        Axios.get(`/userExpenses/currentUser`)
            .then(res => {
                const expensesCurrentMonth = res.data;
                this.setState( {expensesCurrentMonth} );
            });

        Axios.get(`/userIncomes/currentUser`)
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

        let expenseObj = {
            cardTotal,
            householdTotal,
            rentTotal,
            mortgageTotal,
            loanTotal,
            insuranceTotal,
            utilityTotal,
            otherTotal,
            cashTotal
        }



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

        let incomeObj = {
            salaryTotal,
            cashIncomeTotal,
            businessIncomeTotal,
            investmentIncomeTotal,
            gifttIncomeTotal,
            otherIncomeTotal
        }

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
                                    {salaryTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {salaryTotal}</span>Salary</a> : <></>}
                                    {cashIncomeTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {cashIncomeTotal}</span>Cash</a> : <></>}
                                    {businessIncomeTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {businessIncomeTotal}</span>Business</a> : <></>}
                                    {investmentIncomeTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {investmentIncomeTotal}</span>Investment</a> : <></>}
                                    {gifttIncomeTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {gifttIncomeTotal}</span>Gift</a> : <></>}
                                    {otherIncomeTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {otherIncomeTotal}</span>Other</a> : <></>}
                                    
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
                                {cardTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {cardTotal}</span>Credit Card Payment</a> : <></>}
                                {householdTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {householdTotal}</span>Household</a> : <></>}
                                {rentTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {rentTotal}</span>Rent</a> : <></>}
                                {mortgageTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {mortgageTotal}</span>Mortgage</a> : <></>}
                                {loanTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {loanTotal}</span>Loan</a> : <></>}
                                {insuranceTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {insuranceTotal}</span>Insurance</a> : <></>}
                                {utilityTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {utilityTotal}</span>Utility</a> : <></>}
                                {cashTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {cashTotal}</span>Cash</a> : <></>}
                                {otherTotal != 0 ? <a href="#!" className="collection-item"><span className="badge">$ {otherTotal}</span>Other</a> : <></>}                            
                                </div>
                                
                            </div>
                        </li>

                        <li>
                            <div className="collapsible-header"  style={{display: "block"}}>
                                <div className="collection">
                                <a href="#!" className="collection-item"><span className="badge">$ {currentMonthBalance}</span>Total Saving</a>
                                </div>
                            </div>
                        </li>
                        
                    </ul>     
                    <div className="row">
                        <div className="col s12 m12 ">
                            <div className="card-panel teal lighten-1 hoverable z-depth-1">
                                
                                {this.renderGratsMsg(currentMonthBalance)}
                                <p></p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">{this.renderIncomeChart(incomeObj)}</div>
                    <div className="row">{this.renderExpenseChart(expenseObj)}</div>
                    
            </>
        );
    }

    renderIncomeChart(obj) {
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:
                const data = {
                    labels: ['Salary', 'Cash',  'Business', 'Investment', 'Gift', 'Other'],
                    datasets: [
                      {
                        label: 'Suggested Balance Distribution',
                        data: [obj.salaryTotal, obj.cashIncomeTotal, obj.businessIncomeTotal, obj.investmentIncomeTotal, obj.gifttIncomeTotal, obj.otherIncomeTotal],
                        backgroundColor: [
                          '#b3e5fc',
                          '#b2ebf2',
                          '#b2dfdb',
                          '#c8e6c9',
                          '#dcedc8',
                          '#f0f4c3'
                        ], 
                        borderColor: [
                          '#01579b',
                          '#006064',
                          '#004d40',
                          '#1b5e20',
                          '#33691e',
                          '#827717'
                        ],
                        borderWidth: 1,
                      },
                    ],
                }
              return (
                    <>
                    
                    <div className="row">
                        <div className="col s12 m4 " style={{marginTop: "0px"}}>
                            <h5 className="teal-text center-align">Income Distribution</h5>
                            <table style={{marginTop: "25px"}}>
                                
                                <tbody>
                                <tr className="light-blue lighten-4">
                                    <td style={{fontWeight: "bold"}}>Salary</td>
                                    <td>{this.currencyFormatter.format(obj.salaryTotal)}</td>
                                </tr>

                                <tr className="cyan lighten-4">
                                    <td style={{fontWeight: "bold"}}>Cash</td>              
                                    <td>{this.currencyFormatter.format(obj.cashIncomeTotal)}</td>
                                </tr>

                                <tr className="teal lighten-4">
                                    <td style={{fontWeight: "bold"}}>Business</td>
                                    <td>{this.currencyFormatter.format(obj.businessIncomeTotal)}</td>
                                </tr>

                                <tr className="green lighten-4">
                                    <td style={{fontWeight: "bold"}}>Investment</td>
                                    <td>{this.currencyFormatter.format(obj.investmentIncomeTotal)}</td>
                                </tr>

                                <tr className="light-green lighten-4">
                                    <td style={{fontWeight: "bold"}}>Gift</td>
                                    <td>{this.currencyFormatter.format(obj.gifttIncomeTotal)}</td>
                                </tr>

                                <tr className="lime lighten-4">
                                    <td style={{fontWeight: "bold"}}>Other</td>
                                    <td>{this.currencyFormatter.format(obj.otherIncomeTotal)}</td>
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

    renderExpenseChart(obj) {
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:
                const data = {
                    labels: ['Credit Card Payment', 'Household',  'Rent', 'Mortgage', 'Loan', 'Insurance', 'Utilities', 'Cash', 'Other'],
                    datasets: [
                      {
                        label: 'Suggested Balance Distribution',
                        data: [obj.cardTotal, obj.householdTotal, obj.rentTotal, obj.mortgageTotal, obj.loanTotal, obj.insuranceTotal, obj.utilityTotal, obj.cashTotal, obj.otherTotal],
                        backgroundColor: [
                          '#fff9c4',
                          '#ffecb3',
                          '#ffe0b2',
                          '#ffccbc',
                          '#ffcdd2',
                          '#f8bbd0',
                          '#e1bee7',
                          '#d1c4e9',
                          '#c5cae9'
                        ], 
                        borderColor: [
                          '#f57f17 ',
                          '#ff6f00',
                          '#e65100',
                          '#bf360c',
                          '#b71c1c',
                          '#880e4f',
                          '#4a148c',
                          '#311b92',
                          '#1a237e'
                        ],
                        borderWidth: 1,
                      },
                    ],
                }
              return (
                    <>
                    
                    <div className="row">
                        <div className="col s12 m4 " style={{marginTop: "25px"}}>
                            <h5 className="teal-text center-align">Expenses Distribution</h5>
                            <table style={{marginTop: "25px"}}>
                                <tbody>
                                <tr className="yellow lighten-4">
                                    <td style={{fontWeight: "bold"}}>Credit Card Payment</td>
                                    <td>{this.currencyFormatter.format(obj.cardTotal)}</td>
                                </tr>

                                <tr className="amber lighten-4">
                                    <td style={{fontWeight: "bold"}}>Household</td>              
                                    <td>{this.currencyFormatter.format(obj.householdTotal)}</td>
                                </tr>

                                <tr className="orange lighten-4">
                                    <td style={{fontWeight: "bold"}}>Rent</td>
                                    <td>{this.currencyFormatter.format(obj.rentTotal)}</td>
                                </tr>

                                <tr className="deep-orange lighten-4">
                                    <td style={{fontWeight: "bold"}}>Mortgage</td>
                                    <td>{this.currencyFormatter.format(obj.mortgageTotal)}</td>
                                </tr>

                                <tr className="red lighten-4">
                                    <td style={{fontWeight: "bold"}}>Loan</td>
                                    <td>{this.currencyFormatter.format(obj.loanTotal)}</td>
                                </tr>

                                <tr className="pink lighten-4">
                                    <td style={{fontWeight: "bold"}}>Insurance</td>
                                    <td>{this.currencyFormatter.format(obj.insuranceTotal)}</td>
                                </tr>

                                <tr className="purple lighten-4">
                                    <td style={{fontWeight: "bold"}}>Utilities</td>
                                    <td>{this.currencyFormatter.format(obj.utilityTotal)}</td>
                                </tr>

                                <tr className="deep-purple lighten-4">
                                    <td style={{fontWeight: "bold"}}>Cash</td>
                                    <td>{this.currencyFormatter.format(obj.cashTotal)}</td>
                                </tr>

                                <tr className="indigo lighten-4">
                                    <td style={{fontWeight: "bold"}}>Other</td>
                                    <td>{this.currencyFormatter.format(obj.otherTotal)}</td>
                                </tr>
                                
                                </tbody>

                                
                            </table>
                        </div>
                        <div className="col s12 m8 " style={{marginTop:"120px"}}><Doughnut data={data} /></div>
                    </div>
                     
                    </>
              );
        }
    }
    
    currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    renderGratsMsg(balance){
        if(balance == 0){
            return(
                <h4 className="white-text center-align">Start saving today!</h4>
            )
        }
        if(balance > 0){
            return(
                <h4 className="white-text center-align">Good job! You have saved {this.currencyFormatter.format(balance)}!</h4>
            )
        }
        if(balance < 0){
            return(
                <h4 className="white-text center-align">You need to spend less!</h4>
            )
        }
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
                  <p className="teal-text">Breakdown for: </p> 
                  <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Total Saving</a>

                  <ul id='dropdown1' className='dropdown-content'>
                        <li><a href="#!">current month</a></li>
                        <li><a href="#!">Last month</a></li>
                        <li><a href="#!">Last 3 months</a></li>
                  </ul>
                  {this.renderData()}
                    
                </span>
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

