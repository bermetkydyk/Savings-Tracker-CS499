import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchExpenses, fetchIncomes } from '../../actions';
import M from "materialize-css";
import * as XLSX from 'xlsx';
import { useHistory } from "react-router-dom";
import { use } from 'passport';

// var instance = M.Tabs.init(el, options);



class FileUpload extends Component {
    
    state = {
        incomesArr: [],
        expenseArr: [],
        allIncomesArr: [],
        allExpenseArr: [],
        excelDataArr: [],
        excelDataIncomeArr: [],
        excelDataExpenseArr: [],
        file: null
    };

    
    componentDidMount() {
        let tabs = document.querySelectorAll('.tabs');
        
        let options = {
      
        };

        M.Tabs.init(tabs, options);
       
        

        axios.get(`/userIncomes/currentUser/currentMonth`)
            .then(res => {
                const incomesArr = res.data;
                this.setState( { incomesArr });
            })

        axios.get(`/userExpenses/currentUser/currentMonth`)
            .then(res => {
                const expenseArr = res.data;
                this.setState( { expenseArr });
            })
        
        axios.get(`/userIncomes/currentUser`)
            .then(res => {
                const allIncomesArr = res.data;
                this.setState( { allIncomesArr });
            })

        axios.get(`/userExpenses/currentUser`)
            .then(res => {
                const allExpenseArr = res.data;
                this.setState( { allExpenseArr });
            })

    }
    


    formateOutput(type){
        switch(type){
            case 'card':
                return "credit card payment";
            case 'mortgage':
                return "mortgage";
            case 'other':
                return "other";
            default:
                return type;
        }
    }

    deleteExpense(id, e){
        axios.delete(`/userExpenses/remove/${id}`)
            .then(res => {
                console.log(res);
                console.log("Deletion:",res.data);
                const expenseArr = this.state.expenseArr.filter(item => item.expenseId !== id);
                this.setState( { expenseArr });
            })
    }

    deleteIncome(id, e){
        axios.delete(`/userIncomes/remove/${id}`)
            .then(res => {
                console.log(res);
                console.log("Deletion:",res.data);
                const incomesArr = this.state.incomesArr.filter(item => item.incomeId !== id);
                this.setState( { incomesArr });
            })
    }

    onFileChange(e){
        this.setState({ file: e.target.files[0] }); 
    }

    onFileUpload(e){
        //e.preventDefault();
        //let history = useHistory();
        // Create an object of formData 
        const formData = new FormData(); 
     
        // Update the formData object 
        formData.append( 
            "file", 
            this.state.file
        ); 
        
        // Details of the uploaded file 
        //console.log(this.state.selectedFile); 

        // Request made to the backend api 
        // Send formData object 
        axios.post("/api/file/upload", formData)
            .then(res => {
                console.log(res);
                //history.push('/summary');
            })
    }

    readExcel=(file)=>{
        const promise=new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload=(e)=>{
                const bufferArray=e.target.result;
                const wb=XLSX.read(bufferArray,{type:'buffer'});
                const wsname=wb.SheetNames[0];
                const ws=wb.Sheets[wsname];
                const data=XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror=(error)=>{
                reject(error);
            };
        });
        promise.then((excelDataArr)=>{
            
            this.setState( { excelDataArr });
            console.log(this.state);
        })
    };



    render() {

        return (
            <>
            <nav>
                <div className="nav-wrapper white">
                    <p className="brand-logo center teal-text" style={{margin: "0px"}}>File Upload</p>
                </div>
            </nav>

            <div className="container"> 
                <h4 className="teal-text">Upload an Excel File</h4>
                <p>Please download and use the template excel file below</p>
                
                <a href="https://drive.google.com/uc?export=download&id=1K6Om2iOwi4aT8e5KvJXvQj-GHUzWvt9j"><i class="material-icons" style={{marginRight: "5px"}}>file_download</i>coin_file_upload_template.xlsx</a>

                <form onSubmit={(e) => this.onFileUpload(e)}>
                    <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" type="file" onChange={(e)=>{
                          const file = e.target.files[0];
                          this.readExcel(file);
                          this.onFileChange(e);
                      }}/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text"/>
                    </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Upload" className="btn" />
                        <button className="btn grey" href="" style={{marginLeft: "25px"}}>Reset</button>    
                    </div>
                </form>
            </div>

            <section className="container section" id="services" style={{marginTop: "15px"}}>
                
                <div>
                        <h4 className="teal-text">Upload Data</h4>
                </div>
                <div>
                    <h5 className="center teal-text">Income</h5>
                </div>
                <div className="row">
                    
                    
                    <table className="responsive-table">
                        <thead>
                            <tr className="teal-text">
                                <th>Income Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Month</th>
                                <th>Year</th>
                            </tr>
                        </thead>   
                        <tbody>                      
                            {
                                this.state.excelDataArr.length == 0 ? 
                                (<th className="grey-text">no data uploaded yet</th>)
                                :
                                (this.state.excelDataArr.filter(
                                    d => d.Activity == "Income"
                                ).map((d)=>(
                                    <tr>
                                        <th>{d.Type}</th>
                                        <th>{d.Amount}</th>
                                        <th>{d.Description}</th>
                                        <th>{d.Month}</th>
                                        <th>{d.Year}</th>
                                    </tr>
                                )))
                            }
                        </tbody>    
                    </table>
                </div>
                <div>
                    <h5 className="center teal-text">Expense</h5>
                </div>
                <div className="row">         
                    <table className="responsive-table">
                        <thead className="teal-text">
                            <tr>
                                <th>Expense Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Month</th>
                                <th>Year</th>
                            </tr>
                        </thead>   
                        <tbody>
                            {
                                this.state.excelDataArr.length == 0 ? 
                                (<th className="grey-text">no data uploaded yet</th>)
                                :
                                (this.state.excelDataArr.filter(
                                    d => d.Activity == "Expense"
                                ).map((d)=>(
                                    <tr>
                                        <th>{d.Type}</th>
                                        <th>{d.Amount}</th>
                                        <th>{d.Description}</th>
                                        <th>{d.Month}</th>
                                        <th>{d.Year}</th>
                                    </tr>
                                )))
                            }
                            
                        </tbody>    
                    </table>
                </div>
            </section>
            </>
            
        );
    }
}


function mapStateToProps(state) {
    console.log(state);
    return { expenses: state.expenses, incomes: state.incomes };
}

export default connect(mapStateToProps, { fetchExpenses, fetchIncomes })(FileUpload);
