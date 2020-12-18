import React, { Component } from 'react';
import M from "materialize-css";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import guide_pic from './guide_pic.png';
import bottombar_pic from './Bottombar.png';
import './Guide.css';


class Guide extends Component {

    renderImages(){
        return(
            <>
                <img className="guide_image" src={guide_pic}/>
                <img className="bottom_image" src={bottombar_pic}/>
            </>
        )
    }
    render() {

        return (
            <div>
                <h2 className="welcome">Welcome to Coin's User Guide</h2>
                
                {this.renderImages()}

                <div className="summary">
                    <p>
                Summary:
                In the summary section the user can see a monthly breakdown which is Income, Expense and Current Monthly Balance. 
                After pressing on income you will be able to see the breakdown of income that can be salary, cash, business, investment, gift and other income. 
                If you press on the expense, you will be able to see credit card payment, household, rent, mortgage, loan, insurance, utility, cash and other to help you better understand your expenses. 
                At the end of the summary page the user is able to see the pie chart and suggested balance distribution for Long-term Saving, Goals and Expenses. 
                Yellow plus button on summary page let's you access functionalitites: Add Goal, Upload Data, Add Income, Add Expense. 
                </p>
                <p>
                Activity Button:
                In the activity page the user can see a table where all the expenses and incomes are stated. 
                They can delete or edit each expense, income and see the amount of each statement. 
                </p>
                <p>
                Goal Button:
                In the goal page the user can see cards of each goal that he/she added. 
                You will be able to see the amount needed, description, reach by date, priority and when it was created. 
                Also, you can delete each goal if it’s no longer needed. 

                </p>
                </div>
            </div>
        );
    }
}

export default Guide;