import React from 'react';
import RadioButton from '../../radio-button/radio-button-component';
import './review-form-prices-style.scss';

const ReviewFormPrices = () => {
    return (
        <div className='prices-group'>
            <RadioButton
                type='radio' 
                value='Cheap Eats'
                name='prices'
                checked={}
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Mid-range'
                name='prices'
                checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='Fine Dining'
                name='prices'
                checked={} 
                handleChange={handleChange}
            />
        </div>
    )
};

export default ReviewFormPrices;