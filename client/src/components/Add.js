import React, { Component } from 'react';
import M from "materialize-css";
import styled from "styled-components";

const ButtonStyled = styled.div`
    margin-bottom: 3px;
`
class Add extends Component {
  
    componentDidMount() {
        let Modal = document.querySelectorAll('.modal');
    
        let options = {
            
        };
        
        M.Modal.init(Modal, options);
    }
  
    render() {

        return (
            <ButtonStyled>

                <a className='modal-trigger btn-floating btn-large waves-light lime black-text' href='#modal1' data-target='modal1'><i className="material-icons">add</i></a>


                <div id="modal1" className="modal bottom-sheet">
                    <div className="modal-content">
                    <h4 className="center-align" style={{marginBottom: "45px"}}>What would you like to add?</h4>
                    <div className="row">
                        <div className="col s3 m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating light-blue" href="/add/goal/new"><i className="material-icons">playlist_add_check</i></a></p>
                            <p className="center-align">Add Goal</p>
                        </div>
                        <div className="col s3 m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating light-blue" href="/fileupload"><i className="material-icons">file_upload</i></a></p>
                            <p className="center-align">Upload Data File</p>
                        </div>
                        <div className="col s3 m3 ">
                            <p className="center-align"><a className="center-align waves-effect waves-light btn-large btn-floating lime" href="/add/income/new"><i className="material-icons">add</i></a></p>
                            <p className="center-align">Add Income</p>
                        </div>
                        <div className="col s3 m3 ">
                            <p className="center-align"><a className="waves-effect waves-light btn-large btn-floating deep-orange" href='/add/expense/new'><i className="material-icons">remove</i></a></p>
                            <p className="center-align">Add Expense</p>
                        </div>
                    </div>
                    </div>
                </div>


            </ButtonStyled>
        );
    }
}

export default Add;