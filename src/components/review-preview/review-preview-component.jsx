import React, { useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Button, Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
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
                            <Typography variant="h6">Reviewed {reviewDate}</Typography>
                        </Box>
                        <Typography variant="h5">{reviewTitle}</Typography>
                        <Typography variant="body1">{reviewBody}</Typography>

                        <img className='review-image' src='https://picsum.photos/id/1018/1000/600' alt='image' />
                        {
                            images.map(image => {
                                <img className='review-image' src={image.original} alt='image' />
                            })
                        }

                        <Typography variant="body2">Date of Visit: {visitPeriod}</Typography>
                        <Typography variant="body2">Recommended Dish(es): {recommendDish}</Typography>
                        <Typography variant="body2">Visit Type: {visitType}</Typography>

                    </CardContent>
                    <CardActions className='card-actions'>
                        <Button variant="contained" color="primary">
                            <i class="fa fa-thumbs-up"></i>
                            Helpful
                        </Button>
                        <Button variant="outlined" color="secondary" className='report'>
                            <i class="fa fa-flag"></i>
                            Report
                        </Button>
                    </CardActions>
                </div>
            </Card>
        </div>
    )
}

export default ReviewPreview;