import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { requestRestaurantByIdStart, requestRestaurantByIdSuccess } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantRequestSuccess } from '../../redux/restaurant/restaurant-selectors';
import { Image, Transformation } from 'cloudinary-react';
import { Typography, Button } from '@material-ui/core';
import restaurantDefault from "../../assets/restaurant-default.svg";
import './restaurant-preview-2-style.scss';

const RestaurantPreviewTwo = ({ restaurantId, restaurant_name, city, region, country, type, cuisine, price_range, photos,
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
    
    const handleRestaurantClick =  () => {
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
        <div className='restaurant-preview-2-container'>
            {
                photos ? (
                    <Image cloud_name='alinfy' publicId={photos[0].path} className='restaurant-image' alt={restaurant_name} height="180" onClick={handleRestaurantClick}>
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                ) : <img className='restaurant-image' alt={restaurant_name} src={restaurantDefault} height="180" onClick={handleRestaurantClick} />
            }
            <div className='restaurant-detail'>
                <Typography variant="h5" onClick={handleRestaurantClick}>
                    {restaurant_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className='restaurant-features'>
                    {
                        cuisine.length ? (`${cuisine}`) : (``)
                    }
                    {
                        type.length ? (cuisine.length ? `, ${type}` : `${type}`) : (``)
                    }
                    {
                        price_range !== 'unknown' ? (cuisine.length || type.length ? `, ${price_range}` : `${price_range}`) : (``)
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
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    requestSuccess: selectRestaurantRequestSuccess
});

const mapDispatchToProps = dispatch => ({
    requestRestaurantByIdStart: restaurantId => dispatch(requestRestaurantByIdStart(restaurantId)),
    requestRestaurantByIdSuccess: restaurant => dispatch(requestRestaurantByIdSuccess(restaurant)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPreviewTwo));