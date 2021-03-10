import React from 'react';
import './form-button-style.scss';

const FormButton = ({ children, ...otherProps }) => (
    <div className='form-button'>
        <input className='button-input' value={children} {...otherProps} />
    </div>
)

export default FormButton;