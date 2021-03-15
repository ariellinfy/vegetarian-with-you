import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './rating-box-style.scss';

const RatingBox = ({ value, ...otherProps}) => {

    return (
        <div className='rating-container'>
            <Box className='rating-box' component="fieldset">
                <Rating
                    value={value}
                    precision={0.5}
                    {...otherProps}
                />
                <Typography className='rating-review' component="h6">100 reviews</Typography>
            </Box>           
        </div>
    )
}

export default RatingBox;