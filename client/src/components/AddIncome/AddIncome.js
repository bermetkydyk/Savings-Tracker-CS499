import React, { Component } from 'react';
import M from "materialize-css";



class AddIncome extends Component {

    componentDidMount() {
        let Collapsible = document.querySelectorAll('.collapsible');
        let FormSelect = document.querySelectorAll('select');
        let options = {
            
        };
        
        M.Collapsible.init(Collapsible, options);
        M.FormSelect.init(FormSelect, options);
    }

  
    render() {

        return (
            <>  
                    
                    <nav>
                        <div class="nav-wrapper white">
                        <a href="#" className="brand-logo center teal-text">Add Income</a>
                        </div>
                    </nav>
                   
 
                    <div className="container" style={{marginTop: "40px"}}>
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <select>
                                        <option value="" disabled selected>Choose an income type</option>
                                        <option value="1">Cash</option>
                                        <option value="2">Bussiness</option>
                                        <option value="3">Investment</option>
                                        <option value="4">Other</option>
                                        </select>
                                        <label>Income Type</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                    <input placeholder="$" id="income_amount" type="text" class="validate"></input>
                                    <label for="income_amount">Amount</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                    <input placeholder="Add a tag" id="income_tag" type="text" class="validate"></input>
                                    <label for="income_tag">Tag(s)</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                    <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea>
                                    <label for="textarea2">Notes</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                    <button class="btn btn-large waves-effect waves-light col s12 teal darken-3" type="submit" name="action">Add</button>
                                    </div>
                                    <div class="input-field col s12">
                                        <a className="btn btn-large waves-effect waves-light col s12 teal lighten-3" href="/summary">Cancel</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </>
        );
    };
}

export default AddIncome;