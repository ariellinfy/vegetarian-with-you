import React from 'react';
import './radio-button-style.scss';

const RadioButton = ({ id, handleChange, value, ...otherProps}) => (
    <div className='radio-button'>
        <input id={id} type='radio' value={value} onChange={handleChange} {...otherProps} />
        <label htmlFor={id}>{value}</label>
    </div>
);

export default RadioButton;