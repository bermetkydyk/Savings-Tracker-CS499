import React, { Component } from 'react';
import M from "materialize-css";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
    
    componentDidMount() {
      let elems = document.querySelectorAll('.sidenav');

      let options = {};

      M.Sidenav.init(elems, options);
    }

    renderRightNav(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return (
            <span>
            <li className="tab"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/auth/google">Login with Google</a></li>
            </span>
          );
        default:
          return (
            <span>
            <li className="tab"><a href="/">Home</a></li>
            <li><a href="/setting">Setting</a></li>
            <li><a href="/Guide">Guide</a></li>
            <li><a href="/auth/logout">Logout</a></li>
            </span>
          );
      }
    }

    renderLeftNav(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return;
        default:
          return (
            <div className="nav-content">
              <div className="container">
                <ul className="tabs tabs-transparent">
                  <li className="tab"><a href="/summary">Summary</a></li>
                  <li className="tab"><a href="/activity">Activity</a></li>
                  <li className="tab"><a href="/goal">Goal</a></li>
                  <li className="tab right"><a href="/add/expense/new">Add Expense</a></li>
                  <li className="tab right"><a href="/add/income/new">Add Income</a></li>
                  
                </ul>
              </div>
            </div>
          );
      }
    }

    render() {


        return (
            <div>
              <nav className="nav-extended teal lighten-1 hide-on-med-and-down">
              <div className="nav-wrapper">
                <div className="container">
                  <Router>
                  <Link 
                    to={this.props.auth ? '/summary' : '/' } 
                    className="brand-logo" style={{marginLeft: "20px", fontFamily: "'Righteous',cursive"}}
                  >
                    COIN
                  </Link>
                  </Router>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {this.renderRightNav()}
                </ul>
                </div>
              </div>

              {this.renderLeftNav()}

            </nav>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}


export default connect(mapStateToProps)(Header);