import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { requestRestaurantByIdStart, requestRestaurantByIdSuccess } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantRequestSuccess } from '../../redux/restaurant/restaurant-selectors';

import { Typography, Button } from '@material-ui/core';
import RatingBox from '../rating-box/rating-box-component';
import AddIcon from '@material-ui/icons/Add';
import restaurantDefault from "../../assets/restaurant-default.svg";
import './restaurant-preview-1-style.scss';

const RestaurantPreviewOne = ({ restaurantId, restaurant_name, city, region, country, type, cuisine, price_range, overall_rate, review_count, photos,
    requestRestaurantByIdStart, requestRestaurantByIdSuccess, currentUser, requestSuccess, history }) => {

    if (Math.round(price_range) === 1) {
        price_range = 'cheap eats';
    } else if (Math.round(price_range) === 2) {
        price_range = 'mid-range';
    } else if (Math.round(price_range) === 3) {
        price_range = 'fine dining';
    } else {
        price_range = 'unknown';
    };

    const handleRestaurantClick = () => {
        history.push(`/restaurants/${restaurantId}`);
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
        <div className='restaurant-preview-1-container'>
            <div className='preview-1-container' onClick={handleRestaurantClick}>
                <img
                    className='restaurant-image'
                    alt={restaurant_name}
                    height="200"
                    src={photos ? `http://localhost:5000/${photos[0].path}` : restaurantDefault}
                />
                <div className='restaurant-detail'>
                    <Typography variant="h5">
                        {restaurant_name}
                    </Typography>
                    <RatingBox 
                        name="overall-rating"
                        value={overall_rate}
                        count={review_count}
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
            </div>
            <div className='restaurant-action'>
                <Button size="small" color="primary" className='review-btn' onClick={handleReviewClick}>
                    <AddIcon className='review-icon' />
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPreviewOne));