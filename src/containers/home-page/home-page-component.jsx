import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { resetUserUpdateStatus } from '../../redux/user/user-actions';

import Typography from '@material-ui/core/Typography';
import reviewImage from '../../assets/review.svg';
import discoverImage from '../../assets/discover.svg';
import placeImage from '../../assets/place.svg';
import './home-page-style.scss';

const HomePage = ({ resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, resetUserUpdateStatus }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetCreateRestaurantStatus();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetDeleteReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        resetUserUpdateStatus();
    }, [resetRequestRestaurantsStatus, resetFilteredRestaurants, resetCreateRestaurantStatus, resetUpdateRestaurantStatus, 
        resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, resetUserUpdateStatus]);

    return (
        <div className='home-page'>
            <header className='homepage-header'>
                <div className='homepage-welcome-container'>
                    <Typography variant="h1">Taste The Natural</Typography>
                    <Typography variant="h6">Let's find out the romance in the world of vegetables! Come vegetarian with us!</Typography>
                </div>
            </header>
            <div className='homepage-body'>
                <div className='homepage-feature-container feature-container-1'>
                    <div className='feature-image image-1'>
                        <img className='image-1' alt='homepage-img-1' src={reviewImage} />
                    </div>
                    <div className='feature-text'>
                        <Typography variant="h4">Write a review</Typography>
                        <Typography variant="subtitle1">Share your experience with more people! Click on "Write review" button to get started!</Typography>
                    </div>
                </div>
                <div className='homepage-feature-container feature-container-2'>
                    <div className='feature-text'>
                        <Typography variant="h4">Discover restaurants</Typography>
                        <Typography variant="subtitle1">Wondering where to eat? Discover more delicious and amazing restaurants in Explore!</Typography>
                    </div>
                    <div className='feature-image image-2'>
                        <img className='image-2' alt='homepage-img-2' src={discoverImage} />
                    </div>
                </div>
                <div className='homepage-feature-container feature-container-3'>
                    <div className='feature-image'>
                        <img className='image-3' alt='homepage-img-3' src={placeImage} />
                    </div>
                    <div className='feature-text'>
                        <Typography variant="h4">Add a place</Typography>
                        <Typography variant="subtitle1">You know an awesome restaurant but it's not here? Add it on! More people will benefit from your sharing and sense the beauty of green diets!</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetDeleteReviewStatus: () => dispatch(resetDeleteReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetUserUpdateStatus: () => dispatch(resetUserUpdateStatus()),
});

export default connect(null, mapDispatchToProps)(HomePage);