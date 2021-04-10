import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectAdminCurrentPage } from '../../redux/user/user-selectors';
import { resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, requestUserReviewsStart } from '../../redux/review/review-actions';
import { setAdminCurrentPage, resetEditUserEmail } from '../../redux/user/user-actions';

import { Tabs, Tab } from '@material-ui/core';
import UserProfile from '../../components/user-profile/user-profile-component';
import AccountInfo from '../../components/account-info/account-info-component';
import UserReviews from '../../components/user-reviews/user-reviews-component';
import './admin-dashboard-page-style.scss';

const AdminDashboardPage = ({ currentUser, adminCurrentPage, requestUserReviewsStart, setAdminCurrentPage, resetEditUserEmail, 
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
        resetEditUserEmail();
        requestUserReviewsStart(currentUserToken);
    }, []);

    useEffect(() => {
        resetEditUserEmail();
        setValue(adminCurrentPage);
    }, [adminCurrentPage]);

    const [ value, setValue ] = useState(adminCurrentPage);
    const handleChange = (event, newValue) => {
        setAdminCurrentPage(newValue);
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
    currentUser: selectCurrentUser,
    adminCurrentPage: selectAdminCurrentPage
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
    resetEditUserEmail: () => dispatch(resetEditUserEmail()),
    requestUserReviewsStart: currentUserToken => dispatch(requestUserReviewsStart(currentUserToken)),
    setAdminCurrentPage: pageNumber => dispatch(setAdminCurrentPage(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage);