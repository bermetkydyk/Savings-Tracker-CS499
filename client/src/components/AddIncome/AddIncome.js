import React, { Component } from 'react';
import M from "materialize-css";



class AddIncome extends Component {
  

  
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
                                    <input placeholder="cash, tip ..." id="income_src" type="text" class="validate"></input>
                                    <label for="income_src">Income source</label>
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
                                    <div class="col s12">
                                    <label for="password">Is it a recuring income?</label>
                                    <div id="recuring" class="switch">
                                        <label>
                                        No
                                        <input type="checkbox"></input>
                                        <span class="lever"></span>
                                        Yes
                                        </label>
                                    </div>
                                    </div>
                                </div>

                                <div class="input-field col s12">
                                    <select>
                                    <option value="" disabled selected>Recurring every:</option>
                                    <option value="1">1 </option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    </select>
                                    <label>Materialize Select</label>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                    <button class="btn btn-large waves-effect waves-light col s12 teal darken-3" type="submit" name="action">Add</button>
                                    </div>
                                    <div class="input-field col s12">
                                        <a className="btn btn-large waves-effect waves-light col s12 teal lighten-3" href="/dashboard">Cancel</a>
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