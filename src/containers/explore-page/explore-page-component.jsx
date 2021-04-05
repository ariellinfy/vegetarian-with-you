import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { requestAllRestaurantsStart, requestFilteredRestaurants, resetCreateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { selectAllRestaurants, selectRequestPending, selectRequestRestaurantsErr, selectFilterKeyword, selectFilteredRestaurants } from '../../redux/restaurant/restaurant-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import Typography from '@material-ui/core/Typography';
import SearchBar from '../../components/search-bar/search-bar-component';
import SortByButton from '../../components/sort-by-btn/sort-by-btn-component';
import CreateNewButton from '../../components/create-new-btn/create-new-btn-component';
import RestaurantPreviewOne from '../../components/restaurant-preview-1/restaurant-preview-1-component';
import './explore-page-style.scss';

const ExplorePage = ({ allRestaurants, requestPending, requestError, keyword, filteredRestaurants, requestAllRestaurantsStart, requestFilteredRestaurants, currentUser }) => {
    useEffect(() => {
        resetCreateRestaurantStatus();
        requestAllRestaurantsStart('');
    }, [keyword]);

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
                    <div className='explore-header-2' onClick={() => Object.keys(currentUser).length ? (<Redirect to='/createrestaurant' />) : (<Redirect to='/signin' />)}>
                        <CreateNewButton btnType='restaurant profile' />
                    </div>
                </div>
                <div className='explore-body'>
                    {
                        filteredRestaurants.length ? (
                            typeof filteredRestaurants  !== 'string' ? (
                                filteredRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                    <RestaurantPreviewOne key={restaurant_id} {...otherRestaurantProps} />
                                ))
                            ) : ('no matches found')
                           ) : (
                            allRestaurants.map(({ restaurant_id, ...otherRestaurantProps }) => (
                                <RestaurantPreviewOne key={restaurant_id} {...otherRestaurantProps} />
                        )))
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    allRestaurants: selectAllRestaurants,
    requestPending: selectRequestPending,
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

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);