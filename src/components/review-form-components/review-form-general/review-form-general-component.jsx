import React from 'react';
import RadioButton from '../../radio-button/radio-button-component';
import './review-form-general-style.scss';

const ReviewFormGeneral = () => {
    return (
        <div className='general-group'>
            <RadioButton
                type='radio' 
                value='Yes'
                name='general'
                checked={}
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='No'
                name='general'
                checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Not Sure'
                name='general'
                checked={} 
                handleChange={handleChange}
            />
        </div>
    )
};

export default ReviewFormGeneral;