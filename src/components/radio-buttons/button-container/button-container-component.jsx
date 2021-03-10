import React from 'react';
import SelectButton from '../select-button-component';
import './button-container-style.scss';

const ButtonContainer = ({ title, name, values }) => (
    <div className='button-container'>
        <p className='button-title'>{title}</p>
        <div className={`button-group ${name}`}>
            {
                values.map(({ id, ...otherValueProps }) => (
                    <SelectButton 
                        key={id} 
                        name={name}
                        {...otherValueProps} 
                    />
                ))
            }
        </div>
    </div>
)

export default ButtonContainer;