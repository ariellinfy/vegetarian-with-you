import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";
import { resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectRestaurantCreateSuccess, selectTargetRestaurantInfo, selectTargetRestaurantInfoToMap } from '../../redux/restaurant/restaurant-selectors';
import { resetEditUserEmail } from '../../redux/user/user-actions';

import RestaurantForm from '../../components/restaurant-form/restaurant-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './create-restaurant-page-style.scss';

const CreateRestaurantPage = ({ createSuccess, targetRestaurant, targetRestaurantToMap, resetEditUserEmail,
    resetCreateRestaurantStatus, resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus }) => {

    const currentUserToken = localStorage.getItem('token');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [createSuccess]);

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
    }, []);

    return (
        <div className='create-restaurant-page'>
            {
                createSuccess ? (
                    <div className="restaurant-success">
                        <div className="restaurant-header">
                            <Typography variant="h5">
                                You've successfully created 
                                <span className="restaurant-name">
                                    {targetRestaurant.restaurant_name}
                                </span>
                                 restaurant profile!
                            </Typography>
                        </div>
                        <Card className="restaurant-body" elevation={0}>

                                {
                                    targetRestaurantToMap ? (
                                        targetRestaurantToMap.filter((item, index) => index > 0 && index < targetRestaurantToMap.length - 5)
                                        .map(item => (
                                        <Typography key={item[0]} className="restaurant-detail" color="textPrimary">
                                            <span className="data-title">{item[0]}</span>: {item[1]}
                                        </Typography>
                                    ))) : null
                                }

                        </Card>
                        <div className="restaurant-actions">
                            <Typography variant="h5">
                                What's next?
                            </Typography>
                            <Button component={Link} to={'/explore'} variant="outlined" color="primary" className="btn-next">Explore more restaurants</Button>
                            <Button component={Link} to={'/createreview'} variant="contained" color="primary" className="btn-next">Continue to write a reivew</Button>
                        </div>
                    </div>
                ) : (
                    <RestaurantForm currentUserToken={currentUserToken} />
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    createSuccess: selectRestaurantCreateSuccess,
    targetRestaurant: selectTargetRestaurantInfo,
    targetRestaurantToMap: selectTargetRestaurantInfoToMap
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurantPage);