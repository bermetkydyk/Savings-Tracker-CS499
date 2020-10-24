import React, { Component } from 'react';
import M from "materialize-css";



class Goal extends Component {
  
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
                <h1>Goal Page</h1>
            </div>
        );
    }
}

export default Goal;