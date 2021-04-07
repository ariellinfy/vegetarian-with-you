import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { requestAllRestaurantsStart, requestFilteredRestaurantsByFeature, requestFilteredRestaurantsByLocation, resetCreateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { selectAllRestaurants, selectRestaurantRequestPending, selectRequestRestaurantsErr, selectFilterFeatureKeyword, selectFilterLocationKeyword, selectFilteredRestaurants } from '../../redux/restaurant/restaurant-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { Typography, Button } from '@material-ui/core';
import SearchBar from '../../components/search-bar/search-bar-component';
import RestaurantPreviewTwo from '../../components/restaurant-preview-2/restaurant-preview-2-component';
import './find-restaurant-page-style.scss';

const FindRestaurantPage = ({ allRestaurants, requestPending, requestError, featureKeyword, locationKeyword, filteredRestaurants, currentUser, requestAllRestaurantsStart, requestFilteredRestaurantsByFeature, requestFilteredRestaurantsByLocation, resetCreateRestaurantStatus, history }) => {
    useEffect(() => {
        resetCreateRestaurantStatus();
        requestAllRestaurantsStart('');
    }, [currentUser]);

    return (
        <div className='find-restaurant-page'>
            <div className='find-container'>
                <Typography variant="h2">Review a place you've visited</Typography>
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
                        filteredRestaurants.length ? (
                            typeof filteredRestaurants  !== 'string' ? (
                                filteredRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                    <RestaurantPreviewTwo key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                ))
                            ) : (           
                                <div className='find-no-match'>
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
                                    <Typography variant="h5">Restaurant not found here?</Typography>
                                    <Typography variant="h5">Let's add a new restaurant profile!</Typography> 
                                    <Button variant="contained" color="primary" onClick={() => Object.keys(currentUser).length ? (history.push('/createrestaurant')) : (history.push('/signin'))}>
                                        Add a place
                                    </Button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    allRestaurants: selectAllRestaurants,
    requestPending: selectRestaurantRequestPending,
    requestError: selectRequestRestaurantsErr,
    featureKeyword: selectFilterFeatureKeyword,
    locationKeyword: selectFilterLocationKeyword,
    filteredRestaurants: selectFilteredRestaurants,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    requestFilteredRestaurantsByFeature: keyword => dispatch(requestFilteredRestaurantsByFeature(keyword)),
    requestFilteredRestaurantsByLocation: keyword => dispatch(requestFilteredRestaurantsByLocation(keyword)),
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindRestaurantPage));