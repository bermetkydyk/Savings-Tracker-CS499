// GoalFieldDatePicker contains logic to render a 
// date picker and field label
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <>
    
      
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: "5px"}} type='date' ></input>
            <div className="red-text" style={{ marginBottom: "20px"}}>{ touched && error }</div>
            
        </div>
    </>
    );
};