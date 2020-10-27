import React, { Component } from 'react';
import styled from "styled-components";
import M from "materialize-css";
import Add from "./Add";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';


const BottomNavStyled = styled.div`
  overflow: hidden;
  background-color: #26A69A;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  z-index: 8;
`
const NavItemStyled = styled.a`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
`
const NavItem3Styled = styled.div`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  padding-left: 50px;
  padding-right: 0px;
  text-decoration: none;
  font-size: 17px;
`

const AddButtonStyled = styled.div`
  overflow: hidden;
  position: fixed;
  left: calc(50% - 35px);
  bottom: 35px;
  z-index: 9;
  padding: 15px;
`

class BottomBar extends Component {
    
  
  componentDidMount() {
      let SideNav = document.querySelectorAll('.sidenav');
    
      let options = {
          edge: 'right',
          draggable: true,
      };
      
      M.Sidenav.init(SideNav, options);

    }

  renderBottomBar(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return;
        default:
          return (
            <span>
              <AddButtonStyled>

                <Add />

                </AddButtonStyled>
                <BottomNavStyled>

                <NavItemStyled href="/summary">
                <i className="material-icons">home</i>
                <p style={{ margin:"0px", fontSize: "15px"}}>Summary</p>
                </NavItemStyled>

                <NavItemStyled href="/activity">
                <i className="material-icons">event_note</i>
                <p style={{ margin:"0px", fontSize: "15px"}}>Activity</p>
                </NavItemStyled>

                <NavItemStyled>

                </NavItemStyled>

                <NavItemStyled href="/goal">
                <i className="material-icons">done</i>
                <p style={{ margin:"0px", fontSize: "15px"}}>Goal</p>
                </NavItemStyled>

                <NavItemStyled>
                  <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons white-text">menu</i></a>
                  <p style={{ margin:"0px", fontSize: "15px"}}>Menu</p>
                </NavItemStyled>

                </BottomNavStyled>
                
            </span>
          );
      }
    }

    renderAddButton(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return;
        default:
          return (
            <span>
              <a className='modal-trigger btn-floating btn-large waves-light lime black-text' href='#modal2' data-target='modal2'><i className="material-icons">add</i></a>             
            </span>
          );
      }
    }

    render() {
        console.log(this.props.auth);
        return (
          <>
          <div className="hide-on-large-only">
            {this.renderBottomBar()}
            <ul id="mobile-demo" className="sidenav">
              <li><div className="user-view">
                <div className="background" style={{backgroundImage: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)" }}></div>
                <a href="#user"><img className="circle" src="https://i.pinimg.com/170x/d4/38/f7/d438f7151a62b0d73c10bc8a1e1b47e1.jpg" /></a>
                <a href="#name"><span className="name white-text">{ this.props.auth ? this.props.auth.username : null}</span></a>
                <a href="#email"><span className="email white-text">{ this.props.auth ? this.props.auth.email: null}</span></a>
              </div></li>
              <li><a href="/">Home</a></li>
              <li><a href="/">Setting</a></li>
              <li><div className="divider"></div></li>
              <li><a className="waves-effect" href="/auth/logout">Log out</a></li>
            </ul>
            
          </div>

          <div className="fixed-action-btn hide-on-med-and-down" style={{right: "100px", bottom: "200px"}}>
            {this.renderAddButton()}
            <div id="modal2" className="modal bottom-sheet">
              <div className="modal-content">
                    <h4 className="center-align" style={{marginBottom: "45px"}}>What would you like to add?</h4>
                    <div className="row">
                        <div className="col s3  m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating light-green" href="/add/income"><i className="material-icons">autorenew</i></a></p>
                            <p className="center-align">Setup Salary</p>
                        </div>
                        <div className="col s3 m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating light-blue" href="/add/income"><i className="material-icons">account_balance</i></a></p>
                            <p className="center-align">Setup Saving</p>
                        </div>
                        <div className="col s3  m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating lime" href="/add/income"><i className="material-icons">add</i></a></p>
                            <p className="center-align">Add Income</p>
                        </div>
                        <div className="col s3  m3 ">
                            <p className="center-align"><a className="waves-effect waves-light btn-large btn-floating deep-orange" href=''><i className="material-icons">remove</i></a></p>
                            <p className="center-align">Add Expense</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          </>
        );
    }
}


function mapStateToProps(state) {
  return { auth: state.auth };
}


export default connect(mapStateToProps)(BottomBar);