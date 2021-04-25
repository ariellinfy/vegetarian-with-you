import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';
import { requestRestaurantByIdStart, resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { requestReviewsStart, requestReviewsAuthStart, resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetEditUserEmail } from '../../redux/user/user-actions';

import RestaurantBasic from '../../components/restaurant-basic/restaurant-basic-component';
import RestaurantImageGallery from '../../components/restaurant-images/restaurant-images-component';
import RestaurantAdvance from '../../components/restaurant-advance/restaurant-advance-component';
import RestaurantReview from '../../components/restaurant-review/restaurant-review-component';
import './restaurant-page-style.scss';

const RestaurantPage = ({ targetRestaurant, requestReviewsStart, requestReviewsAuthStart, requestRestaurantByIdStart, resetEditUserEmail, 
    resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus,
    currentUser, match }) => {

    const currentUserToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    let restaurantId = targetRestaurant.restaurant_id ? targetRestaurant.restaurant_id : match.params.id;
    let query = `?&restaurantId=${restaurantId}&sortBy=last_modified:desc`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [targetRestaurant]);

    useEffect(() => {
        resetCreateRestaurantStatus();
        resetUpdateRestaurantStatus();
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        resetEditUserEmail();
        requestRestaurantByIdStart(restaurantId);
        Object.keys(currentUser).length ? requestReviewsAuthStart({ query, currentUserToken }) : requestReviewsStart({ query });
    }, []);

    return (
        <div className='restaurant-page'>

            <RestaurantBasic targetRestaurant={targetRestaurant} currentUser={currentUser} />

            <div className='restaurant-body-container'>

                    <RestaurantImageGallery restaurantId={restaurantId} photos={targetRestaurant.photos} />

                    <RestaurantAdvance targetRestaurant={targetRestaurant} />

                    <RestaurantReview currentUser={currentUser} targetRestaurant={targetRestaurant} query={query} />
                
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    targetRestaurant: selectTargetRestaurantInfo,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    requestReviewsStart: data => dispatch(requestReviewsStart(data)),
    requestReviewsAuthStart: data => dispatch(requestReviewsAuthStart(data)),
    requestRestaurantByIdStart: restaurantId => dispatch(requestRestaurantByIdStart(restaurantId)),
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetEditUserEmail: () => dispatch(resetEditUserEmail()),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPage));