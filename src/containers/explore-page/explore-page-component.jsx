import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { requestAllRestaurantsStart, requestFilteredRestaurants, resetCreateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { selectAllRestaurants, selectRestaurantRequestPending, selectRequestRestaurantsErr, selectFilterKeyword, selectFilteredRestaurants } from '../../redux/restaurant/restaurant-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { Typography, Button } from '@material-ui/core';
import SearchBar from '../../components/search-bar/search-bar-component';
import SortByButton from '../../components/sort-by-btn/sort-by-btn-component';
import RestaurantPreviewOne from '../../components/restaurant-preview-1/restaurant-preview-1-component';
import './explore-page-style.scss';

const ExplorePage = ({ allRestaurants, requestPending, requestError, keyword, filteredRestaurants, requestAllRestaurantsStart, requestFilteredRestaurants, resetCreateRestaurantStatus, currentUser, history }) => {
    useEffect(() => {
        resetCreateRestaurantStatus();
        requestAllRestaurantsStart('');
    }, [currentUser]);

    const handleChange = event => {
        requestFilteredRestaurants(event.target.value);
    };

    return (
        <div className='explore-page'>
            <div className='explore-container'>
                <Typography variant="h2">Explore</Typography>
                <div className='explore-header'>
                    <div className='explore-header-1'>
                        <SearchBar type='restaurant' onChange={handleChange} value={keyword}>
                            {
                                'Search...'
                            }
                        </SearchBar>
                        <SortByButton />
                    </div>
                    <div className='explore-header-2' onClick={() => Object.keys(currentUser).length ? (history.push('/createrestaurant')) : (history.push('/signin'))}>
                        <Button variant="contained" color="primary">
                            Create a restaurant profile
                        </Button>
                    </div>
                </div>
                <div className='explore-body'>
                    {
                        filteredRestaurants.length ? (
                            typeof filteredRestaurants  !== 'string' ? (
                                filteredRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                    <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                ))
                            ) : (
                                <div className='find-no-match'>
                                    <Typography variant="h5">Can't find a restaurant?</Typography>
                                    <Typography variant="h5">Fill up a restaurant form to let more people know about it!</Typography> 
                                </div>
                            )
                        ) : (
                            allRestaurants.length ? (
                                allRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                    <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                ))
                            ) : (
                                <div className='find-no-match'>
                                    <Typography variant="h5">Can't find a restaurant?</Typography>
                                    <Typography variant="h5">Fill up a restaurant form to let more people know about it!</Typography> 
                                </div>
                            )
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
    requestError: selectRequestRestaurantsErr,
    keyword: selectFilterKeyword,
    filteredRestaurants: selectFilteredRestaurants,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    requestFilteredRestaurants: keyword => dispatch(requestFilteredRestaurants(keyword)),
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExplorePage));