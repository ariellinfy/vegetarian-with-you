import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { requestAllRestaurantsStart, requestFilteredRestaurantsByFeature, requestFilteredRestaurantsByLocation, resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { selectAllRestaurants, selectRestaurantRequestPending, selectRestaurantRequestSuccess, selectRequestRestaurantErr, selectFilteredRestaurants, selectFilterFeatureKeyword, selectFilterLocationKeyword } from '../../redux/restaurant/restaurant-selectors';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetEditUserEmail } from '../../redux/user/user-actions';

import createImage from '../../assets/new.svg';
import Downloader from '../../components/downloading/downloading-componet';
import { Typography, Button } from '@material-ui/core';
import SearchBar from '../../components/search-bar/search-bar-component';
import RestaurantPreviewTwo from '../../components/restaurant-preview-2/restaurant-preview-2-component';
import './find-restaurant-page-style.scss';

const FindRestaurantPage = ({ allRestaurants, requestPending, requestSuccess, requestError, 
    filteredRestaurants, featureKeyword, locationKeyword, resetEditUserEmail,
    requestAllRestaurantsStart, requestFilteredRestaurantsByFeature, requestFilteredRestaurantsByLocation, 
    resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus,
    currentUser, history }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [requestSuccess]);

    useEffect(() => {
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetCreateRestaurantStatus();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetDeleteReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        resetEditUserEmail();
        requestAllRestaurantsStart('');
    }, []);

    return (
        <div className='find-restaurant-page'>
            <div className='find-container'>
                <Typography variant="h3">Review a place you've visited</Typography>
                <div className='find-restaurant-header'>
                    <SearchBar id='search-restaurant' type='restaurant' onChange={event => requestFilteredRestaurantsByFeature(event.target.value)} value={featureKeyword}>
                            {
                                'Find restaurant...'
                            }
                    </SearchBar>
                    <SearchBar id='search-location' type='location' onChange={event => requestFilteredRestaurantsByLocation(event.target.value)} value={locationKeyword}>
                            {
                                'City or country'
                            }
                    </SearchBar>
                </div>
                <div className='find-restaurant-body'>
                    {
                        requestPending ? (<Downloader />) : (
                            requestSuccess ? (
                                filteredRestaurants.length ? (
                                    typeof filteredRestaurants  !== 'string' ? (
                                        filteredRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                            <RestaurantPreviewTwo key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                        ))
                                    ) : (           
                                        <div className='find-no-match'>
                                            <img alt='create' src={createImage} />
                                            <Typography variant="h5">Restaurant not found here?</Typography>
                                            <Typography variant="h5">Let's add a new restaurant profile!</Typography> 
                                            <Button variant="contained" color="primary" onClick={() => Object.keys(currentUser).length ? (history.push('/createrestaurant')) : (history.push('/signin'))}>
                                                Add a place
                                            </Button>
                                        </div>
                                    )
                                ) : (
                                    allRestaurants.length ? (
                                        allRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                            <RestaurantPreviewTwo key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                        ))
                                    ) : (
                                        <div className='find-no-match'>
                                            <img alt='create' src={createImage} />
                                            <Typography variant="h5">Restaurant not found here?</Typography>
                                            <Typography variant="h5">Let's add a new restaurant profile!</Typography> 
                                            <Button variant="contained" color="primary" onClick={() => Object.keys(currentUser).length ? (history.push('/createrestaurant')) : (history.push('/signin'))}>
                                                Add a place
                                            </Button>
                                        </div>
                                    )
                                )
                            ) : (<Typography variant="h5">{requestError}</Typography>)
                        )
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    allRestaurants: selectAllRestaurants,
    requestPending: selectRestaurantRequestPending,
    requestSuccess: selectRestaurantRequestSuccess,
    requestError: selectRequestRestaurantErr,
    filteredRestaurants: selectFilteredRestaurants,
    featureKeyword: selectFilterFeatureKeyword,
    locationKeyword: selectFilterLocationKeyword,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    requestFilteredRestaurantsByFeature: keyword => dispatch(requestFilteredRestaurantsByFeature(keyword)),
    requestFilteredRestaurantsByLocation: keyword => dispatch(requestFilteredRestaurantsByLocation(keyword)),
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetDeleteReviewStatus: () => dispatch(resetDeleteReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetEditUserEmail: () => dispatch(resetEditUserEmail()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindRestaurantPage));