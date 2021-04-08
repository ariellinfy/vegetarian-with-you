import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { requestRestaurantByIdStart, requestRestaurantByIdSuccess } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantRequestSuccess } from '../../redux/restaurant/restaurant-selectors';
import { requestReviewsStart } from '../../redux/review/review-actions';

import { Typography, Button } from '@material-ui/core';
import restaurantImage from "../../assets/background/temp.jpg";
import './restaurant-preview-2-style.scss';

const RestaurantPreviewTwo = ({ restaurantId, restaurant_name, address, city, region, country, postal_code, type, cuisine, price_range, 
    requestRestaurantByIdStart, requestRestaurantByIdSuccess, requestReviewsStart,
    currentUser, requestSuccess, history }) => {
    
    if (Math.round(price_range) === 1) {
        price_range = 'cheap eats';
    } else if (Math.round(price_range) === 2) {
        price_range = 'mid-range';
    } else if (Math.round(price_range) === 3) {
        price_range = 'fine dining';
    } else {
        price_range = 'unknown';
    };
    
    const handleRestaurantClick = async () => {
        const query = `?&restaurantId=${restaurantId}`;
        await requestRestaurantByIdStart(restaurantId);
        await requestReviewsStart(query);
        
        if (requestSuccess) {
            history.push(`/restaurants/${restaurantId}`);
        }
    };

    const handleReviewClick = async () => {
        await requestRestaurantByIdStart(restaurantId);
        await requestRestaurantByIdSuccess({ restaurantId });

        if (Object.keys(currentUser).length) {
            if (requestSuccess) {
                history.push('/createreview');
            }
        } else {
            history.push('/signin')
        };
   };
    return (
        <div className='restaurant-preview-2-container'>
            <img
                className='restaurant-image'
                alt={restaurant_name}
                height="180"
                src={restaurantImage}
                onClick={handleRestaurantClick}
            />
            <div className='restaurant-detail'>
                <Typography variant="h5" onClick={handleRestaurantClick}>
                    {restaurant_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className='restaurant-features'>
                    {
                        price_range !== 'unknown' ? (`${cuisine}, ${type}, ${price_range}`) : (`${cuisine}, ${type}`)
                    }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p" className='restaurant-location'>
                    {
                        city ? (`${city}, ${country}`) : (`${region}, ${country}`)
                    }
                </Typography>
            </div>
            <div className='restaurant-action'>
                <Button size="small" color="primary" className='review-btn' onClick={handleReviewClick}>
                    Write a review
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    requestSuccess: selectRestaurantRequestSuccess
});

const mapDispatchToProps = dispatch => ({
    requestRestaurantByIdStart: restaurantId => dispatch(requestRestaurantByIdStart(restaurantId)),
    requestRestaurantByIdSuccess: restaurantInfo => dispatch(requestRestaurantByIdSuccess(restaurantInfo)),
    requestReviewsStart: query => dispatch(requestReviewsStart(query))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPreviewTwo));