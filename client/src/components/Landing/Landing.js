import React, { Component } from 'react';
import M from "materialize-css";
import customeStyle from "./Landing.css";


class Landing extends Component {
  
    componentDidMount() {
        
    }

    renderButton(){
        switch(this.props.auth){
          case null:
            return;
          case false:
            return (
                <a href="/auth/google" class="text-white">Login with Google</a>
            );
          default:
            return;
        }
    }
  
    render() {

        return (
            
            <div id="LandingPage"  style={{ height: "100%", minHeight: "800px"}}>
                <div className="container"  style={{ paddingTop: "200px" }}>
                        <h1 className="header center white-text" style={{ marginTop: "0" }}>COIN</h1>
                        <div className="row center">
                            <h5 className="header col s12 white-text">A plan to help you reach <strong>IMPOSSIBLE</strong> financial goals!</h5>
                            <h4 className="white-text">{this.renderButton()}</h4>
                        </div>

                </div>

            </div>
        );
    }
}

export default Landing;