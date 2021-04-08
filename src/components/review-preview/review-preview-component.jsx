import React, { useState } from 'react';
import { Avatar, Button, Box, Typography, GridList, GridListTile } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './review-preview-style.scss';

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

const ReviewPreview = ({ reviewId, review_title, review_body, overall_rate, visit_period, recommended_dishes, 
    helpful_user, helpful_record, create_by, create_at }) => {

    const handleClick = event => {

    };

    return (
        <div className='review-preview'>
            <div className='card-header'>
                <div className='header-avatar'>
                    <Avatar className='avatar'>A</Avatar>
                </div>
                <div className='header-user'>username</div>
            </div>
            
            <div className='card-body'>
                <div className='card-content'>
                    <Box className='content-header' component="div" mb={3} borderColor="transparent">
                        <Rating
                            name="overallRate"
                            value={overall_rate || 0}
                            precision={0.5}
                            readOnly
                        />
                        <Typography variant="h6">Reviewed {create_at}</Typography>
                    </Box>
                    <Typography variant="h5">{review_title}</Typography>
                    <Typography variant="body1">{review_body}</Typography>

                    <GridList className='image-container' cols={2.5}>
                        {
                            images.map((image, index) => (
                              <GridListTile key={image.original}>
                                <img className='review-image' src={image.original} alt={`${reviewId}/${index}`} />
                             </GridListTile>
                            ))
                        }
                    </GridList>
                    
                    <Typography variant="body2">Date of Visit: {visit_period}</Typography>
                    <Typography variant="body2">Recommended Dish(es): {recommended_dishes}</Typography>
                </div>

                <div className='card-actions'>
                    {
                        helpful_record ? (<Typography variant="body2">{helpful_record} people found this helpful</Typography>) : null
                    }
                    {
                        helpful_user ? (
                            <Typography variant="body2">Thank you for your feedback.</Typography>
                    ) : (
                            <Button variant="contained" color="primary" onClick={handleClick}>
                                <i className="fa fa-thumbs-up"></i>
                                Helpful
                            </Button>
                        )
                    }
                    
                    <Button variant="outlined" color="secondary" className='report'>
                        <i className="fa fa-flag"></i>
                        Report
                    </Button>
                </div>

            </div>
        </div>
    )
};

export default ReviewPreview;