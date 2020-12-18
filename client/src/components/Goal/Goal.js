import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExpenses, fetchIncomes, fetchGoals } from '../../actions';
import M from "materialize-css";
import customeStyle from "./Goal.css"; 
import axios from 'axios';

class Goal extends Component {
  
    state={
        currentUser: {},
        currentUserGoalArr: [],
        completeGoalArr: [],
        imcompleteGoalArr: [],
        completeGoalNum: 0,
        imcompleteGoalNum: 0
    }

    currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    componentDidMount() {
        // Initializing MaterializeCSS  javascript component 
        // Note: the Tab component may cause problems, since we use tab for top navigation bar
        //let tabs = document.querySelectorAll('.tabs');
        //let options = {
      
        //};  
        //M.Tabs.init(tabs, options);

        // Fetching data from Database with Aios
        this.props.fetchExpenses();
        this.props.fetchIncomes();
        this.props.fetchGoals();

        axios.get(`/users/currentUser`)
            .then(res => {
                const currentUser = res.data;
                this.setState( { currentUser });
                console.log(this.state.currentUser);
                
            })

        axios.get(`/userGoals/currentUser`)
            .then(res => {
                const currentUserGoalArr = res.data;
                const imcompleteGoalArr = [];
                const completeGoalArr = [];
                let imcompleteGoalNum = 0;
                let completeGoalNum = 0;
                this.setState( { currentUserGoalArr });
                currentUserGoalArr.map(goal=>{
                    if(goal.isComplete=="0"){
                        imcompleteGoalArr.push(goal);
                        imcompleteGoalNum++;
                    }
                    else{
                        completeGoalArr.push(goal);
                        completeGoalNum++;
                    }
                })
                this.setState( {imcompleteGoalArr} );
                this.setState( {completeGoalArr} );
                this.setState( {imcompleteGoalNum} );
                this.setState( {completeGoalNum} );
                console.log(this.state);
                //console.log(this.state.currentUserGoalArr);
            })
            // .then(
            //     this.state.currentUserGoalArr? this.filterCurrentGoalArr : console.log("currentUserGoalArr is empty")
            // )
        
        console.log(this.state.currentUserGoalArr.length==0 ? "this.state.currentUserGoalArr is empty ": this.state.currentUserGoalArr );
        const imcompleteGoalArr = this.state.currentUserGoalArr.filter(goal=> goal.isComplete == "0");
        this.setState( {imcompleteGoalArr});
        console.log(this.state.imcompleteGoalArr);
        
    }

    // filterCurrentGoalArr(){
    //     const imcompleteGoalArr = this.state.currentUserGoalArr? this.state.currentUserGoalArr.filter(goal=> goal.isComplete == "0") : [];
    //     this.setState( {imcompleteGoalArr});
    // }

    
    renderGoals(){
        return this.props.goals.map(goal => {
            return (
                <>

                <a class="card2" href="#">
                    <div class="card__background"  key={goal.goalId}></div>
                    <div class="card__content">
                        <p class="card__category">{goal.title}</p>
                        <h3 class="card__heading">{this.currencyFormatter.format(goal.amountNeeded)}</h3>
                        <p class="card__text" style={{marginTop: "100px"}}>Reach by: {goal.reachByDate}</p>
                        <p class="card__text">Created at: {goal.createdAt}</p>
                        <p class="card__text">Priority: {goal.priority}</p>
                       

                    </div>
                </a>
                </>
            )
        })
    }

    completeGoal(goal, e){
        axios.put(`/userGoals/completeGoal/${goal.goalId}`,{isComplete: "1"})
            .then(res => {
                console.log(res);
                console.log("Completing Goal....",res.data);
                const imcompleteGoalArr = this.state.imcompleteGoalArr.filter(item=> item.goalId !== goal.goalId);
                this.setState( { imcompleteGoalArr });
                
            })
    }

    completeGoal2(goal, e){
        axios.all([
            axios.put(`/userGoals/completeGoal/${goal.goalId}`,{isComplete: "1"}),
            axios.post(`/userExpenses/currentUser/add`,goal)
        ])
        .then(axios.spread((completGoal, minusGoal) => {
            console.log(completGoal);
            console.log("Completing Goal....",completGoal.data);
            const imcompleteGoalArr = this.state.imcompleteGoalArr.filter(item=> item.goalId !== goal.goalId);
            this.setState( { imcompleteGoalArr });
            console.log(minusGoal);
            console.log("Minus Goal from saving....",minusGoal.data);
            this.setState( this.state);
        }))
        .catch(error => console.log(error));
    }

    savingMinusGoal(goal){
        axios.post(`/userExpenses/currentUser/add`,goal)
        .then(res => {
            console.log(res);
            console.log("Completing Goal....",res.data);
            //onst imcompleteGoalArr = this.state.imcompleteGoalArr.filter(goal=> goal.goalId !== goal.goalId);
            //this.setState( { imcompleteGoalArr });
    })
    }

    calcProgress(goal){
        if(goal.savingsTowardsGoal-goal.amountNeeded >= 0){
            return (
                <a className="btn pulse" onClick={(e) => this.completeGoal2(goal, e)}>
                    Complete it!
                </a>
            );
        }
        else{
            return (
                <p className="teal-text">
                    {(goal.savingsTowardsGoal/goal.amountNeeded * 100).toFixed(1) + "%"}
                </p>
            );
        }
    }

    formatePriority(prio){
        switch(prio){
            case 1:
                return "High";
            case 2:
                return "Medium";
            case 3:
                return "Low";
            default:
                return prio;
        }
    }

    renderGoalArr(){
        return this.state.currentUserGoalArr.map(goal => {

            return (
                <>

                <a class="card2" href="#">
                    <div class="card__background"  key={goal.goalId}></div>
                    <div class="card__content">
                        <p class="card__category">{goal.title}</p>
                        <h3 class="card__heading">{this.currencyFormatter.format(goal.amountNeeded)}</h3>
        
                        <p class="card__text" style={{marginTop: "100px"}}>Reach by: {goal.reachByDate}</p>
                        <p class="card__text">Created at: {goal.createdAt}</p>
                        <p class="card__text">Priority: {goal.priority}</p>
                        <p class="card__text">Suggested amount for the goal: {goal.savingsTowardsGoal}</p>
                        <p class="card__text">Progress: {this.calcProgress(goal)}</p>
                       

                    </div>
                </a>
                </>
            )
        })
    }

    renderGoalArrWithMatCards(){
        return this.state.imcompleteGoalArr.map(goal => {
            
                return (
                    <>
    
                        <div class="card sticky-action medium">
                            <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                            </div>
                            <div class="card-content">
                            <span class="card-title activator teal-text text-darken-4 center"  style={{fontWeight:"bold"}}>{goal.title}<i class="material-icons right">more_vert</i></span>
                            <p className="teal-text center">Amount needed:</p>
                            <h4 className="center" style={{marginTop:"10px", fontWeight:"bold"}}>{this.currencyFormatter.format(goal.amountNeeded)}</h4>
                            </div>
                            <div className="card-action center">
                                <p><span className="center" style={{fontWeight:"bold"}}>{this.calcProgress(goal)}</span></p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title teal-text teal-darken-4">{goal.title}<i class="material-icons right">close</i></span>
                                
                                <p style={{marginTop: "25px"}}><span className="teal-text">Created at:</span><span className="right">{goal.createdAt}</span></p>
                                <p><span className="teal-text">Reach by: </span> <span className="right">{goal.reachByDate}</span></p>
                                <p><span className="teal-text">Priority: </span> <span className="right">{this.formatePriority(goal.priority)}</span></p>
                                <p><span className="teal-text" style={{maxWidth: "30px"}}>Description: </span> {goal.description}</p>
                                
    
                                <a className="btn" style={{marginTop: "30px", marginRight: "20px", marginLeft: "20px"}}>Edit</a>
                                <a className="btn" style={{marginTop: "30px"}}>Delete</a>
                                
                            </div>
                        </div>
    
                    </>
                )
            

        })
    }
    renderSummary(){
        return (

                <div class="container" style={{marginTop: "30px"}}>
                    <div class="row">
                        <div class="col m4 s12">
                            <div class="card1 bg-c-blue order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 center">Total saving</h6>
                                    <h2 class="center">{ this.state.currentUser.totalBalance ? this.currencyFormatter.format(this.state.currentUser.totalBalance) : 0}</h2>
                           
                                </div>
                            </div>
                        </div>
                        
                        <div class="col m4 s12">
                            <div class="card1 bg-c-green order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 center">Current goals</h6>
                                    <h2 class="center"><span className="center">{ this.state.imcompleteGoalNum}</span></h2>
                            
                                </div>
                            </div>
                        </div>
                        
                        <div class="col m4 s12">
                            <div class="card1 bg-c-yellow order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 center">Completed goals</h6>
                                    <h2 class="center"><i class="fa fa-refresh f-left"></i><span>{ this.state.completeGoalNum }</span></h2>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        )
    }

    renderExampleGoals(){
        return(
            <>
                <a class="card2" href="#">
                    <div class="card__background" style={{backgroundImage: "url(https://www.amny.com/wp-content/uploads/2020/09/Hunter_School-aod.jpg)"}}></div>
                    <div class="card__content">
                        <p class="card__category">Save for grad school</p>
                        <h3 class="card__heading">$2000</h3>
                    </div>
                </a>

                <a class="card2" href="#">
                    <div class="card__background" style={{backgroundImage: "url(https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"}}></div>
                    <div class="card__content">
                        <p class="card__category">Category</p>
                        <h3 class="card__heading">Example Card Heading</h3>
                    </div>
                </a>

                <a class="card2" href="#">
                    <div class="card__background" style={{backgroundImage: "url(https://images.unsplash.com/photo-1556680262-9990363a3e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"}}></div>
                    <div class="card__content">
                        <p class="card__category">Category</p>
                        <h3 class="card__heading">Example Card Heading</h3>
                    </div>
                </a>
            
                <a class="card2" href="#">
                    <div class="card__background" ></div>
                    <div class="card__content">
                        <p class="card__category">Category</p>
                        <h3 class="card__heading">Example Card Heading</h3>
                    </div>
                </a>
        </>
        )
    }

    render() {

        return (
            <>
                <nav>
                    <div className="nav-wrapper white">
                        <p className="brand-logo center teal-text" style={{margin: "0px"}}>My Goals</p>
                        <div className="container">
                            <a className="btn waves-effect waves-light right lime black-text" type="submit" name="action" href="/add/goal/new" style={{marginTop: "12px", fontWeight: "bold"}}>Add New Goal</a>
                        </div>
                    </div>
                </nav>
                {this.renderSummary()}
                
                <section class="hero-section">
                    <div class="card-grid">
                        {this.renderGoalArrWithMatCards()}
                    </div>
                </section>
            </>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return { expenses: state.expenses, incomes: state.incomes, goals: state.goals };
}

export default connect(mapStateToProps, { fetchExpenses, fetchIncomes, fetchGoals })(Goal);