import React from 'react';
import './text-area-style.scss';

const TextArea = ({ label, handleChange, ...otherProps }) => (
    <div className='text-group'>
        <textarea className='text-input' onChange={handleChange} {...otherProps} />
        {
            label?
            (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default TextArea;