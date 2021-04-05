import React from 'react';
import { Typography, Button } from '@material-ui/core';
import RatingBox from '../rating-box/rating-box-component';
import AddIcon from '@material-ui/icons/Add';
import restaurantImage from "../../assets/background/temp.jpg";
import './restaurant-preview-1-style.scss';

const RestaurantPreviewOne = ({ restaurant_name, city, region, country, type, cuisine, price_range, overall_rate }) => {
    // handleClick: request target restaurant by id
    // redirect to target restaurant page (no auth needed)
    // write a review: direct only if sign in

    return (
        <div className='restaurant-preview-1-container'>
            <img
                className='restaurant-image'
                alt="restaurant-image"
                height="175"
                src={restaurantImage}
            />
            <div className='restaurant-info'>
                <div className='restaurant-detail'>
                    <Typography variant="h5">
                        {restaurant_name}
                    </Typography>
                    <RatingBox 
                        name="overall-rating"
                        value={overall_rate}
                        readOnly
                    />
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom className='restaurant-features'>
                        {
                            price_range !== 'unknown' ? (`${cuisine}, ${type}, ${price_range}`) : (`${cuisine}, ${type}`)
                        }
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p" className='restaurant-location'>
                        {
                            city ? (`${city}, ${country}`) : (`${region}, ${country}`)
                        }
                    </Typography>
                </div>
                <div className='restaurant-action'>
                    <Button size="small" color="primary" className='review-btn'>
                        <AddIcon className='review-icon' />
                        Write a review
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPreviewOne;