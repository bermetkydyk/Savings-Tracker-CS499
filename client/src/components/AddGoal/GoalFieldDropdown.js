// GoalFieldDropdown contains logic to render a 
// dropdown and field label
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <>
    
      
        <div>
            <label>{label}</label>
            <select {...input} style={{ marginBottom: "5px"}}>
                <option value="" disabled selected>Choose an income type</option>
                <option value="salary">Salary</option>
                <option value="cash">Cash</option>
                <option value="business">Business</option>
                <option value="investment">Investment</option>
                <option value="gift">Gift</option>
                <option value="other">Other</option>
            </select>
            <div className="red-text" style={{ marginBottom: "20px"}}>{ touched && error }</div>
            
        </div>
    </>
    );
};