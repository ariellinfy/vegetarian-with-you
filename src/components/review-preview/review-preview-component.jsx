import React, { useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardMedia, CardActions, Button, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faFlag } from '@fortawesome/free-solid-svg-icons';
import './review-preview-style.scss';

const ReviewPreview = () => {
    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];
    const today = new Date();
    const reviewDate = today.getFullYear() + '-' + ((today.getMonth() + 1).length > 1 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1)));
    const [review, setReview] = useState({
        reviewTitle: 'Nice restaurant with old fashioned',
        reviewBody: 'Nice restaurant with old fashioned cooking! The restaurant is located at the old downtown Calgary. Nice area and nice place, the food was good, tasty and to perfection. The only thing the size was very small. Drinks were overpriced. However, the overall experience was good.',
        visitPeriod: '2020/11/11',
        visitType: '',
        recommendDish: '',
    });
    const { reviewTitle, reviewBody, visitPeriod, visitType, recommendDish } = review;

    const [rate, setRate] = useState({
        overallRate: 2.5,
        foodRate: 2.5,
        serviceRate: 2.5,
        valueRate: 2.5,
        atomsphereRate: 2.5
    });
    const { overallRate, foodRate, serviceRate, valueRate, atomsphereRate } = rate;

    const helpfulIcon = <FontAwesomeIcon icon={faThumbsUp} color='white' className='icon' />
    const reportIcon = <FontAwesomeIcon icon={faFlag} color='#ef6c00' className='icon' />

    return (
        <div className='review-preview'>
            <Card className='card-container'>
                <div className='card-header'>
                    <CardHeader 
                        className='header-avatar'
                        avatar={<Avatar className='avatar'>A</Avatar>} 
                    />
                    <div className='header-user'>username</div>
                </div>
                
                <div className='card-body'>
                    <CardContent className='card-content'>
                        <Box className='content-header' component="div" mb={3} borderColor="transparent">
                            <Rating
                                name="overallRate"
                                value={overallRate}
                                precision={0.5}
                                readOnly
                            />
                            <h6>Reviewed {reviewDate}</h6>
                        </Box>
                        <h3>{reviewTitle}</h3>
                        <p>{reviewBody}</p>

                        <img className='review-image' src='https://picsum.photos/id/1018/1000/600' alt='image' />
                        {
                            images.map(image => {
                                <img className='review-image' src={image.original} alt='image' />
                            })
                        }
                        <h5>Date of Visit: {visitPeriod}</h5>
                        <h5>Recommended Dish(es): {recommendDish}</h5>
                        <h5>Visit Type: {visitType}</h5>
                    </CardContent>
                    <CardActions className='card-actions'>
                        <Button variant="contained" color="primary">
                            {helpfulIcon}
                            Helpful
                        </Button>
                        <Button variant="outlined" color="secondary" className='report'>
                            {reportIcon}
                            Report
                        </Button>
                    </CardActions>
                </div>
            </Card>
        </div>
    )
}

export default ReviewPreview;