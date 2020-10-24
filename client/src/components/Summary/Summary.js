import React, { Component } from 'react';
import styled from "styled-components";
import M from "materialize-css";
import { AdviceCard } from './AdviceCard'
import { Card } from './Card';

export const Banner = styled.div`
    height: 200px;
    background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
    background-position:center;
    background-size: cover;
    filter: contrast(90%);
`
const Greeting = styled.p`
    margin-top: 0;
    text-align: center;
    padding-top: 40px;
`

const Advice = styled.p`
    margin-top: 0;
    color: white;
    text-align: center;
    padding-top: 10px;
`

class Summary extends Component {
  
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
            <>
            <div className="container">
                <div className="col s12 m2">
                    <Banner>
                        <Greeting>Night John</Greeting>
                        <Advice>Get Paid What You're Worth and Spend Less Than You Earn.</Advice>
                        
                    </Banner>
                    <div class="collection">
                        <a href="#!" class="collection-item"><span class="badge">$1300</span>Cash</a>
                        <a href="#!" class="collection-item"><span class="badge">$2000</span>Saving</a>
                        <a href="#!" class="collection-item red-text"><span class="badge red-text">-$150</span>Debt</a>
                        <a href="#!" class="collection-item"><span class="badge">$3150</span>Your Balance</a>
                    </div>
             
                        <div className = "row">
                            <div className = "col l6 m6 s12">
                                <AdviceCard>
                                <Advice>You have saved $500 in the past month</Advice>
                                </AdviceCard>
                            </div>
                            <div className = "col l6 m6 s12">
                                <Card></Card>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col l6 m6 s12">
                                <Card></Card>
                            </div>
                            <div className = "col l6 m6 s12">
                                <Card></Card>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col l6 m6 s12">
                                <Card></Card>
                            </div>
                            <div className = "col l6 m6 s12">
                                <Card></Card>
                            </div>
                        </div>
                   
                    
                </div>
            </div>
            </>
        );
    }
}

export default Summary ;