import React from 'react';
import RadioButton from '../../radio-button/radio-button-component';
import './review-form-visit-style.scss';

const ReviewFormVisit = () => {
    return (
        <div className='visit-group'>
            <RadioButton
                type='radio' 
                value='Couples'
                name='visit'
                checked={}
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Family'
                name='visit'
                checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Friends'
                name='visit'
                checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Business'
                name='visit'
                checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Solo'
                name='visit'
                checked={} 
                handleChange={handleChange}
            />
        </div>
    )
};

export default ReviewFormVisit;