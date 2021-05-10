import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { requestAllRestaurantsStart, requestFilteredRestaurants, resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants, setCurrentPage, setTotalPages } from '../../redux/restaurant/restaurant-actions';
import { selectAllRestaurants, selectRestaurantRequestPending, selectRestaurantRequestSuccess, selectRequestRestaurantErr, selectFilterKeyword, selectFilteredRestaurants, selectCurrentPage, selectTotalPages } from '../../redux/restaurant/restaurant-selectors';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetUserUpdateStatus } from '../../redux/user/user-actions';

import createImage from '../../assets/new.svg';
import Downloader from '../../components/downloading/downloading-componet';
import AlertMessage from '../../components/alert-message/alert-message-component';
import SearchBar from '../../components/search-bar/search-bar-component';
import SortByButton from '../../components/sort-by-btn/sort-by-btn-component';
import RestaurantPreviewOne from '../../components/restaurant-preview-1/restaurant-preview-1-component';
import { Typography, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import './explore-page-style.scss';

const ExplorePage = ({ allRestaurants, requestPending, requestSuccess, requestError, currentPage, totalPages, setCurrentPage, setTotalPages,
    keyword, filteredRestaurants, requestAllRestaurantsStart, requestFilteredRestaurants, resetUserUpdateStatus,
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
        resetUserUpdateStatus();
        requestAllRestaurantsStart('');
    }, [resetRequestRestaurantsStatus, resetFilteredRestaurants, resetCreateRestaurantStatus, resetUpdateRestaurantStatus,
        resetCreateReviewStatus, resetUpdateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, resetUserUpdateStatus, 
        requestAllRestaurantsStart]);

    useEffect(() => {
        filteredRestaurants.length ? (
            typeof filteredRestaurants  !== 'string' ? setTotalPages(Math.ceil(filteredRestaurants.length / 9)) : setTotalPages(0)
        ) : (
            allRestaurants.length ? setTotalPages(Math.ceil(allRestaurants.length / 9)) : setTotalPages(0)
        );
    }, [setTotalPages, allRestaurants, filteredRestaurants]);

    const handleChange = event => {
        requestFilteredRestaurants(event.target.value);
    };

    const handlePagination = (event, value) => {
        setCurrentPage(value);
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
                        requestPending ? <Downloader /> : (
                            requestSuccess ? (
                                filteredRestaurants.length ? (
                                    typeof filteredRestaurants  !== 'string' ? (
                                        currentPage === totalPages ? (
                                            filteredRestaurants.slice((currentPage-1)*9).map(({ restaurant_id, ...otherRestaurantProps }) => (
                                            <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                            ))
                                        ) : (
                                            filteredRestaurants.slice((currentPage-1)*9, currentPage*9).map(({ restaurant_id, ...otherRestaurantProps }) => (
                                            <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                            ))
                                        )
                                    ) : (
                                        <div className='find-no-match'>
                                            <img alt='create' src={createImage} />
                                            <Typography variant="h5">Can't find a restaurant?</Typography>
                                            <Typography variant="h5">Fill up a restaurant form to let more people know about it!</Typography> 
                                        </div>
                                    )
                                ) : (
                                    allRestaurants.length ? (
                                        currentPage === totalPages ? (
                                            allRestaurants.slice((currentPage-1)*9).map(({ restaurant_id, ...otherRestaurantProps }) => (
                                                <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                            ))
                                        ) : (
                                            allRestaurants.slice((currentPage-1)*9, currentPage*9).map(({ restaurant_id, ...otherRestaurantProps }) => (
                                                <RestaurantPreviewOne key={restaurant_id} restaurantId={restaurant_id} {...otherRestaurantProps} />
                                            ))
                                        )
                                    ) : (
                                        <div className='find-no-match'>
                                            <img alt='create' src={createImage} />
                                            <Typography variant="h5">Can't find a restaurant?</Typography>
                                            <Typography variant="h5">Fill up a restaurant form to let more people know about it!</Typography> 
                                        </div>
                                    )
                                )
                            ) : <AlertMessage severity='error' errMsg={requestError} />
                        )
                    }
                </div>
                <div className='pagination-container'>
                    {
                        totalPages ? 
                        <Pagination 
                            count={totalPages} 
                            page={currentPage} 
                            size="large"
                            onChange={handlePagination} 
                        /> : null
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
    keyword: selectFilterKeyword,
    currentUser: selectCurrentUser,
    currentPage: selectCurrentPage,
    totalPages: selectTotalPages
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    requestFilteredRestaurants: keyword => dispatch(requestFilteredRestaurants(keyword)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    setTotalPages: page => dispatch(setTotalPages(page)),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExplorePage));