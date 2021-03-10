import React, { useState, useEffect, useRef } from 'react';
import './select-button-style.scss';

const SelectButton = ({ id, name, value, ...otherProps }) => {
    
    const [selectedOption, setSelected] = useState('');
    const isFirstRun = useRef(true);
    const handleChange = event => {
        const { value, name } = event.target;
        // setSelected({ [name]: value });
        setSelected({ selectedOption: value });
        console.log(value, name, event.target, selectedOption);
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
            }
        return;
    }, handleChange);

    return (
        <div className='select-button'>
            <label htmlFor={id}>
                <input 
                    className='btn-input'
                    id={id} 
                    name={name}
                    value={value} 
                    checked={selectedOption === value}
                    onChange={handleChange}
                    {...otherProps} 
                />
                <div className='btn-label'>{value}</div>
            </label>
        </div>
    )
}

export default SelectButton;
