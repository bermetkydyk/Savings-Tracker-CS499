import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { createGlobalStyle } from 'styled-components';
import Header from './Header';
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
  h1, h2, h3 {
    font-family: 'Righteous', cursive;
  }
`


const Dashboard = () => <h2>Dashboard</h2>
const IncomeNew = () => <h2>IncomeNew</h2>
const AddSubscription = () => <h2>AddSubscription</h2>
const Landing = () => <h2>Landing</h2>


const App = () => {
    return (
    <div className="container">
        <GlobalStyle />
        <Header />
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/income/new" component={IncomeNew} />
            </div>
        </BrowserRouter>
    </div>
    );
};

export default App;