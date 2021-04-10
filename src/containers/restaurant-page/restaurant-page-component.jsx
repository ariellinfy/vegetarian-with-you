import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';
import { requestRestaurantByIdStart, resetRequestRestaurantsStatus, resetFilteredRestaurants, resetUpdateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { requestReviewsStart, resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetEditUserEmail } from '../../redux/user/user-actions';

import RestaurantBasic from '../../components/restaurant-basic/restaurant-basic-component';
import RestaurantImageGallery from '../../components/restaurant-images/restaurant-images-component';
import RestaurantAdvance from '../../components/restaurant-advance/restaurant-advance-component';
import RestaurantReview from '../../components/restaurant-review/restaurant-review-component';
import './restaurant-page-style.scss';

const RestaurantPage = ({ targetRestaurant, requestReviewsStart, requestRestaurantByIdStart, resetEditUserEmail, 
    resetRequestRestaurantsStatus, resetFilteredRestaurants, resetUpdateRestaurantStatus, 
    resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestUserReviewsStatus,
    currentUser, match }) => {

    let restaurantId = targetRestaurant.restaurant_id ? targetRestaurant.restaurant_id : match.params.id;
    let query = `?&restaurantId=${restaurantId}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [targetRestaurant]);

    useEffect(() => {
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetRequestUserReviewsStatus();
        resetEditUserEmail();
        requestRestaurantByIdStart(restaurantId);
        requestReviewsStart(query);
    }, []);

    return (
        <div className='restaurant-page'>

            <RestaurantBasic targetRestaurant={targetRestaurant} currentUser={currentUser} />

            <div className='restaurant-body-container'>

                    <RestaurantImageGallery />

                    <RestaurantAdvance targetRestaurant={targetRestaurant} />

                    <RestaurantReview currentUser={currentUser} reviewCount={targetRestaurant.review_count} query={query} />
                
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    targetRestaurant: selectTargetRestaurantInfo,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    requestReviewsStart: query => dispatch(requestReviewsStart(query)),
    requestRestaurantByIdStart: restaurantId => dispatch(requestRestaurantByIdStart(restaurantId)),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetEditUserEmail: () => dispatch(resetEditUserEmail()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPage));