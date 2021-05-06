import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTargetRestaurantInfo, selectRestaurantRequestPending, selectRestaurantRequestSuccess, selectRequestRestaurantErr } from '../../redux/restaurant/restaurant-selectors';
import { requestRestaurantByIdStart, resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { requestReviewsStart, requestReviewsAuthStart, resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetUserUpdateStatus } from '../../redux/user/user-actions';

import AlertMessage from '../../components/alert-message/alert-message-component';
import Downloader from '../../components/downloading/downloading-componet';
import RestaurantBasic from '../../components/restaurant-basic/restaurant-basic-component';
import RestaurantImageGallery from '../../components/restaurant-images/restaurant-images-component';
import RestaurantAdvance from '../../components/restaurant-advance/restaurant-advance-component';
import RestaurantReview from '../../components/restaurant-review/restaurant-review-component';
import './restaurant-page-style.scss';

const RestaurantPage = ({ targetRestaurant, currentUser, requestPending, requestSuccess, requestError, match, 
    requestReviewsStart, requestReviewsAuthStart, requestRestaurantByIdStart, resetUserUpdateStatus, 
    resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus }) => {

    let currentUserToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')).token : '';
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
        resetDeleteReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        resetUserUpdateStatus();
        requestRestaurantByIdStart(restaurantId);
        Object.keys(currentUser).length ? requestReviewsAuthStart({ query, currentUserToken }) : requestReviewsStart({ query });
    }, []);

    return (
        <div className='restaurant-page'>
        {
            requestPending ? <Downloader /> : (
                requestSuccess ? (
                    <>
                        <RestaurantBasic targetRestaurant={targetRestaurant} currentUser={currentUser} />
                        <div className='restaurant-body-container'>
                            <RestaurantImageGallery restaurantId={restaurantId} photos={targetRestaurant.photos} />
                            <RestaurantAdvance targetRestaurant={targetRestaurant} />
                            <RestaurantReview currentUser={currentUser} targetRestaurant={targetRestaurant} query={query} />
                        </div>
                    </>
                ) : <AlertMessage severity='error' errMsg={requestError} />
            )
        }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    targetRestaurant: selectTargetRestaurantInfo,
    currentUser: selectCurrentUser,
    requestPending: selectRestaurantRequestPending,
    requestSuccess: selectRestaurantRequestSuccess,
    requestError: selectRequestRestaurantErr,
});

const mapDispatchToProps = dispatch => ({
    requestRestaurantByIdStart: restaurantId => dispatch(requestRestaurantByIdStart(restaurantId)),
    requestReviewsStart: data => dispatch(requestReviewsStart(data)),
    requestReviewsAuthStart: data => dispatch(requestReviewsAuthStart(data)),
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetDeleteReviewStatus: () => dispatch(resetDeleteReviewStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetUserUpdateStatus: () => dispatch(resetUserUpdateStatus()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPage));