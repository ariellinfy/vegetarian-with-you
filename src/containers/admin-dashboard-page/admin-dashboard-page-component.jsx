import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, requestUserReviewsStart } from '../../redux/review/review-actions';

import { Tabs, Tab } from '@material-ui/core';
import UserProfile from '../../components/user-profile/user-profile-component';
import AccountInfo from '../../components/account-info/account-info-component';
import UserReviews from '../../components/user-reviews/user-reviews-component';
import './admin-dashboard-page-style.scss';

const AdminDashboardPage = ({ currentUser, requestUserReviewsStart,
    resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus }) => {
    
    let currentUserToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    useEffect(() => {
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetCreateRestaurantStatus();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        requestUserReviewsStart(currentUserToken);
    }, []);

    const [ value, setValue ] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='admin-dashboard-page'>
            <div position="static" className='admin-dashboard-container'>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="User Profile" className='admin-tab' />
                    <Tab label="Account Info" className='admin-tab' />
                    <Tab label="My Reviews" className='admin-tab' />
                </Tabs>
                {
                    value === 0 ? <UserProfile user={currentUser} /> : (value === 1 ? <AccountInfo user={currentUser} /> : <UserReviews />)
                }
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    resetCreateRestaurantStatus: () => dispatch(resetCreateRestaurantStatus()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    requestUserReviewsStart: currentUserToken => dispatch(requestUserReviewsStart(currentUserToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage);