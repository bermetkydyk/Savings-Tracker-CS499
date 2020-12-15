import React, { Component } from 'react';
import M from "materialize-css";




class Login extends Component {
  
    componentDidMount() {
        let Modal = document.querySelectorAll('.modal');
    
        let options = {
            
        };
        
        M.Modal.init(Modal, options);
    }
  
    render() {

        return (
            <div className="container">
            <div><a className="waves-effect waves-light btn modal-trigger" href="#modal1">Login</a></div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <main style={{flex: "1 0 auto"}}>
                            <center>
                                <h1>Coin</h1>    
                                <img class="responsive-img" src="" />
                                <h5 className="teal-text">Please, login into your account</h5>
                                <div class="section" style={{ display: "inline-block", padding: "32px 48px 0px 48px",  border: "1px solid #EEE"}}></div>

                                <div class="container">
                                    <div class="z-depth-1 grey lighten-4 row">

                                    <form class="col s12" method="post">
                                        <div class='row'>
                                        <div class='col s12'>
                                        </div>
                                        </div>

                                        <div class='row'>
                                        <div class='input-field col s12'>
                                            <input class='validate' type='email' name='email' id='email' />
                                            <label for='email'>Enter your email</label>
                                        </div>
                                        </div>

                                        <div class='row'>
                                        <div class='input-field col s12'>
                                            <input class='validate' type='password' name='password' id='password' />
                                            <label for='password'>Enter your password</label>
                                        </div>
                                        <label>
                                                            <a class='pink-text' href='#!'><b>Forgot Password?</b></a>
                                                        </label>
                                        </div>

                                        <br />
                                        <center>
                                        <div class='row'>
                                            <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect '>Login</button>

                                        </div>
                                        </center>
                                    </form>
                                    </div>
                                </div>
                                <a href="#!">Create account</a>
                            
                            </center>

                    <div class="section"></div>
                    <div class="section"></div>
                </main>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;