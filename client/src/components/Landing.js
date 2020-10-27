import React, { Component } from 'react';
import M from "materialize-css";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';


class Landing extends Component {
  
    componentDidMount() {
        let carousel = document.querySelectorAll('.carousel.carousel-slider');
    
        let options = {
            fullWidth: true,
            indicators: true
        };
        
        M.Carousel.init(carousel, options);
    }

    renderContent(){
        switch(this.props.auth){
          case null:
            return;
          case false:
            return (
                <div className="carousel-fixed-item center">
                    <a href="/auth/google" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Login with Google</a>
                </div>
            );
          default:
            return;
        }
    }

    render() {

        return (
            <div className="carousel carousel-slider center">
                {this.renderContent()}
                <div className="carousel-item black-text" href="#one!">
                    <div className="container">
                        <h1 class="header center ">COIN</h1>
                        <div class="row center">
                            <h5 class="header col s12 light">A plan to help you reach <strong>IMPOSSIBLE</strong> financial goals!</h5>
                        </div>

                    </div>
                <p className="white-text">This is your first panel</p>
                </div>
                <div className="carousel-item amber white-text" href="#two!">
                    <h2>Second Panel</h2>
                    <p className="white-text">This is your second panel</p>
                </div>
                <div className="carousel-item green white-text" href="#three!">
                    <h2>Third Panel</h2>
                    <p className="white-text">This is your third panel</p>
                </div>
                <div className="carousel-item blue white-text" href="#four!">
                    <h2>Fourth Panel</h2>
                    <p className="white-text">This is your fourth panel</p>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { auth: state.auth };
  }
  
  
export default connect(mapStateToProps)(Landing);