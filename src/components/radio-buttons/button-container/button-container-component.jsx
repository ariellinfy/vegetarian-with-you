import React, { useEffect } from 'react';
import SelectButton from '../select-button-component';
import './button-container-style.scss';

const ButtonContainer = ({ title, name, values }) => {
    useEffect(() => {
        const buttonGroup = document.querySelector(`.${name}`);
        const label = buttonGroup.children;
        label.classList.remove('selected');
        // console.log(buttonGroup, label)
    })

    return (
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
}

export default ButtonContainer;