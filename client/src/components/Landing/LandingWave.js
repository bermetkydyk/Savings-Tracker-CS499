import React, { Component } from 'react';
import M from "materialize-css";
import customeStyle from "./wave-bg.css";



class Landing extends Component {
  
    componentDidMount() {
        let carousel = document.querySelectorAll('.carousel.carousel-slider');
    
        let options = {
            fullWidth: true,
            indicators: true
        };
        
        M.Carousel.init(carousel, options);
    }
  
    render() {

        return (
            <div>
                <div className="container" style={{ marginTop: "150px" }}>
                        <h1 className="header center white-text">COIN</h1>
                        <div className="row center">
                            <h5 className="header col s12 white-text">A plan to help you reach <strong>IMPOSSIBLE</strong> financial goals!</h5>
                        </div>

                </div>
                <div className="waveWrapper waveAnimation">
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}} ></div>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}} ></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;