import React, { useState } from 'react';

import './review-preview-style.scss';

const ReviewPreview = () => {

    const [review, setReview] = useState({
        reviewTitle: '',
        reviewBody: '',
        visitPeriod: '',
        visitType: '',
        price: '',
        recommendDish: '',
    });
    const { reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish } = review;

    const [rate, setRate] = useState({
        overallRate: 2.5,
        foodRate: 2.5,
        serviceRate: 2.5,
        valueRate: 2.5,
        atomsphereRate: 2.5
    });
    const { foodRate, serviceRate, valueRate, atomsphereRate } = rate;

    return (
        <div className='review-preview'>
            
        </div>
    )
}

export default ReviewPreview;