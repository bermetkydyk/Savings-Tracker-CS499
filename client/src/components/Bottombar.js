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
const NavItem3Styled = styled.a`
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
  bottom: 5px;
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

                <NavItemStyled href="/dashboard">
                <i class="material-icons">home</i>
                </NavItemStyled>

                <NavItemStyled href="/activity">
                <i class="material-icons">event_note</i>
                </NavItemStyled>

                <NavItemStyled>

                </NavItemStyled>

                <NavItemStyled href="/goal">
                <i class="material-icons">done</i>
                </NavItemStyled>

                <NavItemStyled>
                  <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons white-text">menu</i></a>
                </NavItemStyled>

                </BottomNavStyled>
                
            </span>
          );
      }
    }

    render() {
        console.log(this.props.auth);
        return (
          <div className="hide-on-large-only">
            {this.renderBottomBar()}
            <ul id="mobile-demo" class="sidenav">
              <li><div class="user-view">
                <div class="background">
                  <img src="images/office.jpg" />
                </div>
                <a href="#user"><img class="circle" src="images/yuna.jpg" /></a>
                <a href="#name"><span class="white-text name"></span></a>
                <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
              </div></li>
              <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
              <li><a href="#!">Second Link</a></li>
              <li><div class="divider"></div></li>
              <li><a class="subheader">Subheader</a></li>
              <li><a class="waves-effect" href="#!">Log out</a></li>
            </ul>
            
          </div>
          
        );
    }
}


function mapStateToProps(state) {
  return { auth: state.auth };
}


export default connect(mapStateToProps)(BottomBar);