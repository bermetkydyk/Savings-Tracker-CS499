// GoalFieldDropdown contains logic to render a 
// dropdown and field label
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <>
    
      
        <div>
            <label>{label}</label>
            <select {...input} style={{ marginBottom: "5px"}}>
                <option value="" disabled selected>Choose priority</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <div className="red-text" style={{ marginBottom: "20px"}}>{ touched && error }</div>
            
        </div>
    </>
    );
};