import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Bottombar from './Bottombar';
import Footer from './Footer';
import Summary from './Summary/Summary';
import Activity from './Activity/Activity';
import Goal from './Goal/Goal';
import Login from './Login/Login';
import AddIncome from './AddIncome/AddIncome';
import { GlobalStyle } from './Styles/GlobalStyle';


const Dashboard = () => <h2>Dashboard</h2>
const IncomeNew = () => <h2>IncomeNew</h2>
const AddSubscription = () => <h2>AddSubscription</h2>



class App extends Component {
    
    componentDidMount(){
        this.props.fetchUser();
    }

    render (){
        return (
            <div>
                <GlobalStyle />
                <Header />
                <Router>
                    <div>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Summary} />
                        <Route exact path="/activity" component={Activity} />
                        <Route exact path="/goal" component={Goal} />
                        <Route exact path="/add/income" component={AddIncome} />
                    </div>
                </Router>
                <Bottombar />
                <Footer />
            </div>
        );
    }

};

export default connect(null, actions)(App);