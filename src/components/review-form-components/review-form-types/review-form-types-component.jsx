import React from 'react';
import RadioButton from '../../radio-button/radio-button-component';
import './review-form-types-style.scss';

const ReviewFormTypes = () => {
    const handleChange = event => {
        // const { value, name } = event.target;
    }

    return (
        <div className='types-group'>
            <RadioButton
                type='radio' 
                value='lacto'
                name='types'
                checked='True'
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='ovo'
                name='types'
                // checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='ovo-lacto'
                name='types'
                // checked={} 
                handleChange={handleChange}
            />
            <RadioButton
                type='radio' 
                value='vegan'
                name='types'
                // checked={} 
                handleChange={handleChange}
            />
        </div>
    )
};

export default ReviewFormTypes;