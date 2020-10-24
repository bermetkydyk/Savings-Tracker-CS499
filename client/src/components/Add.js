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

                <a class='modal-trigger btn-floating btn-large waves-light lime black-text' href='#modal1' data-target='modal1'><i class="material-icons">add</i></a>


                <div id="modal1" class="modal bottom-sheet">
                    <div class="modal-content">
                    <h4 className="center-align">What would you like to add?</h4>
                    <div className="row">
                        <div className="col s6">
                            <a class="center-align waves-effect waves-light btn-large btn-floating" href="/add/income"><i class="material-icons">add</i></a>
                            <p>Add Income</p>
                        </div>
                        <div className="col s6">
                            <a class="waves-effect waves-light btn-large btn-floating" href=''><i class="material-icons">remove</i></a>
                            <p>Add Expense</p>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div>
                </div>


            </ButtonStyled>
        );
    }
}

export default Add;