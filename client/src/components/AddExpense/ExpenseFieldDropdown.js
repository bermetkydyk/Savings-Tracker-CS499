// ExpenseFieldDropdown contains logic to render a 
// dropdown and field label
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <>
    
      
        <div>
            <label>{label}</label>
            <select {...input} style={{ marginBottom: "5px"}}>
                <option value="" disabled selected>Choose an expense type</option>
                <option value="card">Credit Card Payment</option>
                <option value="household">Household</option>
                <option value="rent">Rent</option>
                <option value="mortgage">Mortgage</option>
                <option value="loan">Loan</option>
                <option value="insurance">Insurance</option>
                <option value="utility">Utilities</option>
                <option value="cash">Cash</option>
                <option value="other">Other</option>
            </select>
            <div className="red-text" style={{ marginBottom: "20px"}}>{ touched && error }</div>
            
        </div>
    </>
    );
};