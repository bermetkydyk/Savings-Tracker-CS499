import React, { Component } from 'react';
import styled from "styled-components";
import M from "materialize-css";
import { AdviceCard } from './AdviceCard'
import { Card } from './Card';
import { connect } from 'react-redux';
import css from './summary.css';
import { Doughnut } from 'react-chartjs-2';

export const Banner = styled.div`
    height: 200px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
    animation: gradient 25s ease infinite;
    
`
const Greeting = styled.h3`
    color: white;
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
        let Collapsible = document.querySelectorAll('.collapsible.expandable');
        let Dropdown = document.querySelectorAll('.dropdown-trigger');
        let collapsOpt = {
            
        };
        let dropdownOpt = {
            
        };

        
        M.Collapsible.init(Collapsible, collapsOpt);
        M.Dropdown.init(Dropdown, dropdownOpt);
    }

    renderSummary() {
        
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:

            let Collapsible = document.querySelectorAll('.collapsible.expandable');
            let Dropdown = document.querySelectorAll('.dropdown-trigger');
            let collapsOpt = {
                
            };
            let dropdownOpt = {
                
            };

            
            M.Collapsible.init(Collapsible, collapsOpt);
            M.Dropdown.init(Dropdown, dropdownOpt);
              return (
                <span>
                  <p className="teal-text">Monthly breakdown for: </p> 
                  <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Current month</a>

                  <ul id='dropdown1' class='dropdown-content'>
                        <li><a href="#!">Last month</a></li>
                        <li><a href="#!">Last 3 months</a></li>
                        <li><a href="#!">Year to the day</a></li>
                  </ul>

                  <ul className="collapsible expandable">
                        <li></li>
                        <li>
                            <div className="collapsible-header"  style={{display: "block"}}>
                                <div className="collection">
                                    <a href="#!" className="collection-item"><span className="badge">$1,500</span>Income</a>
                                </div>
                            </div>
                            <div class="collapsible-body">
                                <div className="collection">
                                    <a href="#!" className="collection-item"><span className="badge">$500</span>Salary</a>
                                    <a href="#!" className="collection-item"><span className="badge">$500</span>Cash</a>
                                    <a href="#!" className="collection-item"><span className="badge">$200</span>Business</a>
                                    <a href="#!" className="collection-item"><span className="badge">$200</span>Investment</a>
                                    <a href="#!" className="collection-item"><span className="badge">$100</span>Other</a>
                                </div>
                                
                            </div>
                        </li>

                        <div className="collapsible-header"  style={{display: "block"}}>
                            <div className="collection">
                                <a href="#!" className="collection-item red-text"><span className="badge red-text">-$500</span>Expense</a>
                            </div>
                        </div>
                        
                        <div className="collapsible-header"  style={{display: "block"}}>
                            <div className="collection">
                                <a href="#!" className="collection-item"><span className="badge">$1,000</span>Long-term Saving</a>
                            </div>
                        </div>

                        <div className="collapsible-header"  style={{display: "block"}}>
                            <div className="collection">
                            <a href="#!" className="collection-item"><span className="badge">$2000</span>Your Balance</a>
                            </div>
                        </div>
                    </ul>       
                </span>
              );
        }
    }

    renderWaterfall() {
        

        return(
            <>
                <div id="wrapper">
                    <div id="columns">
                    
                            
                        <div class="card pin hoverable medium">
                            <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1092,c_fill,g_auto,h_614,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170606120957-california---travel-destination---shutterstock-220315747.jpg" />
                            </div>
                            <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">Trip to California<i class="material-icons right">more_vert</i></span>
                            <p><a href="#">Uploaded by: John Smith</a></p>
                            <p><a href="#">Created on: 10/20/2020</a></p>
                            </div>
                            <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">Trip to California<i class="material-icons right">close</i></span>
                            <p>Targeting saving: $1000</p>
                            </div>
                        </div>
                    
                        
                    
                        <div class="pin hoverable">
                            <img src="https://www.thoughtco.com/thmb/PbF-ApJy-P6Y6GnG_PkHSwIj-tk=/2469x1852/smart/filters:no_upscale()/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" />
                            <p>
                            convallis.
                            </p>
                    <p>timestamp</p>
                        </div>
                    
                        <div class="pin hoverable">
                            <p>
                                Donec a fermentum nisi. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <p>
                                Donec a fermentum nisi. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://thumbor.granitemedia.com/waterfalls/gQUVA404RQbOMivDxj7BwHGxgJM=/800x0/filters:format(webp):quality(80)/granite-web-prod/d8/82/d8821cc4b2dc4c71bab555d029834516.jpeg" />
                            <p>
                                Nullam eget lectus augue. Donec eu sem sit amet ligula 
                                faucibus suscipit. Suspendisse rutrum turpis quis nunc 
                                convallis quis aliquam mauris suscipit.
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://www.tesla.com/sites/default/files/drupal8/social/ModelY_Social.jpg" />
                            <p>
                                Donec a fermentum nisi. Integer dolor est, commodo ut 
                                sagittis vitae, egestas at augue. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://img.pixers.pics/pho_wat(s3:700/FO/48/24/08/67/700_FO48240867_353d15f2e5120f21b00068647b810f42.jpg,467,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,247,650,jpg)/wall-murals-vertical-long-road.jpg.jpg" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed feugiat consectetur pellentesque. Nam ac elit risus, 
                                ac blandit dui. Duis rutrum porta tortor ut convallis.
                                Duis rutrum porta tortor ut convallis.
                            </p>
                        </div>	
                        
                        <div class="pin hoverable">
                            <img src="https://ca-times.brightspotcdn.com/dims4/default/57ed066/2147483647/strip/true/crop/5760x3840+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F71%2F68%2F20726d884120967a7283414cbf6c%2Fla-photos-1staff-590051-la-summer-pandemic-weekend-south-jja-010.JPG" />
                            <p>
                                Nullam eget lectus augue. Donec eu sem sit amet ligula 
                                faucibus suscipit. Suspendisse rutrum turpis quis nunc 
                                convallis quis aliquam mauris suscipit.
                                Duis rutrum porta tortor ut convallis.
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://thumbs.dreamstime.com/b/long-road-autumn-vertical-shot-fall-44906662.jpg" />
                            <p>
                                Nullam eget lectus augue. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed feugiat consectetur pellentesque. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://i.kym-cdn.com/photos/images/newsfeed/000/383/586/993.gif" />
                            <p>
                                Donec a fermentum nisi. Integer dolor est, commodo ut 
                                sagittis vitae, egestas at augue. Suspendisse id nulla 
                                ac urna vestibulum mattis. Duis rutrum porta tortor ut convallis.
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://thumbs.gfycat.com/ImpossibleWhiteBanteng-size_restricted.gif" />
                            <p>
                                Donec a fermentum nisi. Integer dolor est, commodo ut 
                                sagittis vitae, egestas at augue. Suspendisse id nulla 
                                ac urna vestibulum mattis. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://news.psu.edu/sites/default/files/styles/threshold-992/public/DRAW.JPG?itok=qym7816D" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed feugiat consectetur pellentesque. Nam ac elit risus, 
                                ac blandit dui. Duis rutrum porta tortor ut convallis.
                            </p>
                        </div>	
                        
                        <div class="pin hoverable">
                            <img src="https://media4.giphy.com/media/dNgK7Ws7y176U/200.gif" />
                            <p>
                                Donec a fermentum nisi. Integer dolor est, commodo ut 
                                sagittis vitae, egestas at augue. Suspendisse id nulla 
                                ac urna vestibulum mattis. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/zoom_image_3/3000x2000/17f82f742ffe127f42dca9de82fb58b1/5/c/1590583501_M9319UMOL_M900_E03_ZH.jpg" />
                            <p>
                                Donec a fermentum nisi. Integer dolor est, commodo ut 
                                sagittis vitae, egestas at augue. Suspendisse id nulla 
                                ac urna vestibulum mattis. 
                            </p>
                        </div>
                    
                        <div class="pin hoverable">
                            <img src="https://ubiqum.com/assets/uploads/2019/03/untitled-design-1-1-1.png" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed feugiat consectetur pellentesque. Nam ac elit risus, 
                                ac blandit dui. Duis rutrum porta tortor ut convallis.
                            </p>
                        </div>
                
                        <div class="pin hoverable">
                            <img src="https://cdn.britannica.com/63/59363-050-F082087B/Garden-Kinkaku-Temple-shelter-structure-use-landscape.jpg" />
                            <p>
                                Nullam eget lectus augue. 
                            </p>
                        </div>
                
                         <div class="pin hoverable">
                            <img src="https://www.asiafundmanagers.com/wp-content/uploads/2020/02/China-economy.jpg" />
                            <p>
                                Nullam eget lectus augue. 
                            </p>
                        </div>
                    </div>
                </div>
            </>
          );

    }

    renderChart() {
        switch(this.props.auth){
            case null:
              return;
            case false:
              return;
            default:
                const data = {
                    labels: ['Long-term Saving', 'Goals',  'Expenses'],
                    datasets: [
                      {
                        label: '# of Votes',
                        data: [500, 1000, 500, 0,],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          
                          
                          'rgba(75, 192, 192, 0.8)',
                          'rgba(54, 162, 235, 0.2)',
                          
                          'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          
                        
                          'rgba(75, 192, 192, 1)',
                          'rgba(54, 162, 235, 1)',
                         
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                }
              return (
                    <>
                    <div class="row">
                        <div class="col s12 m12 ">
                            <div class="card-panel teal lighten-1 hoverable z-depth-1">
                                <h4 class="white-text center-align">Good job! You have saved $2,000 this month.</h4>
                                <p></p>
                            </div>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col s12 m4 " style={{marginTop: "65px"}}>
                            <h5 className="teal-text center-align">Suggested Balance Distribution</h5>
                            <table style={{marginTop: "25px"}}>
                                

                                <tbody>
                                <tr className="blue lighten-5">
                                    <td>Long-term Saving</td>
                            
                                    <td>$500</td>
                                </tr>
                                <tr className="teal lighten-3">
                                    <td >Goals</td>
                                  
                                    <td>$1,000</td>
                                </tr>
                                <tr className="red lighten-5">
                                    <td >Possible Expenses</td>
                            
                                    <td>$500</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col s12 m8 "><Doughnut data={data} /></div>
                    </div>
                     
                    </>
              );
        }
    }

    
  
    render() {

        return (
            <>
            <div className="container">
                <div className="col s12 m2">
                    <Banner>
                        <Greeting>Hi, <span>{ this.props.auth ? this.props.auth.username : "there"}</span> :)</Greeting>
                        <Advice>Get Paid What You're Worth and Spend Less Than You Earn.</Advice>
                        
                    </Banner>
                    
                    {this.renderSummary()}

                    {this.renderChart()}
                        
                   



                    
                </div>
                
            </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}
  
export default connect(mapStateToProps)(Summary);