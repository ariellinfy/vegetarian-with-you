import React from 'react';
import './radio-button-style.scss';

const RadioButton = ({ handleChange, value, ...otherProps}) => (
    <div className='radio'>
        <label>
            <input className='radio-input' onChange={handleChange} {...otherProps} />
            {value}
        </label>
    </div>
);

export default RadioButton;