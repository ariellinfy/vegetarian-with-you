import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from "react-router-dom";
import { resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectReviewUpdateSuccess, selectTargetReviewInfo, selectTargetReviewInfoToMap } from '../../redux/review/review-selectors';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';
import { resetUserUpdateStatus, setAdminCurrentPage } from '../../redux/user/user-actions';

import ReviewForm from '../../components/review-form/review-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './update-review-page-style.scss';

const UpdateReviewPage = ({ updateSuccess, targetReview, targetReviewToMap, targetRestaurant, resetUserUpdateStatus, setAdminCurrentPage,
    resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants,
    resetCreateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus }) => {

    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [updateSuccess]);

    useEffect(() => {
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetDeleteReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
        resetUserUpdateStatus();
    }, [resetRequestRestaurantsStatus, resetFilteredRestaurants, resetUpdateRestaurantStatus, 
        resetCreateReviewStatus, resetDeleteReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus, resetUserUpdateStatus]);

    return (
        <div className='update-review-page'>
            {
                updateSuccess ? (
                    <div className="review-success">
                        <div className="review-header">
                            <Typography variant="h5">You've successfully uploaded your review!</Typography>
                            <Typography variant="h5" className="review-name">{`--- ${targetReview.review_title} ---`}</Typography>
                        </div>
                        <Card className="review-body" elevation={0}>
                                {
                                    targetReviewToMap ? (
                                        targetReviewToMap
                                        .filter((item, index) => index > 1 && index < targetReviewToMap.length - 6)
                                        .map(item => {
                                            if (item[0] === 'price_range') {
                                                if (item[1] === 1) {
                                                    item[1] = 'cheap eats';
                                                } else if (item[1] === 2) {
                                                    item[1] = 'mid-range';
                                                } else if (item[1] === 3) {
                                                    item[1] = 'fine dining';
                                                } else {
                                                    item[1] = 'unknown';
                                                }
                                            };
                                            if (item[0] === 'photos') {
                                                item[1] = `${item[1].map(item => item.originalname)}`
                                            };
                                            return (
                                            <Typography key={item[0]} className="review-detail" color="textPrimary">
                                                <span className="data-title">{item[0]}</span>: {item[1]}
                                            </Typography>
                                    )})) : null
                                }
                        </Card>
                        <div className="review-actions">
                            <Typography variant="h5">
                                What's next?
                            </Typography>
                            <Button component={Link} to={'/explore'} variant="outlined" color="primary" className="btn-next">Explore more restaurants</Button>
                            <Button component={Link} to={'/useraccount'} variant="contained" color="primary" className="btn-next" onClick={() => setAdminCurrentPage(2)}>View my reviews</Button>
                        </div>
                    </div>
                ) : (
                    Object.keys(targetRestaurant).length === 0 ? (<Redirect to='/find' />) : (<ReviewForm currentUserToken={currentUserToken} targetRestaurant={targetRestaurant} />)
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    updateSuccess: selectReviewUpdateSuccess,
    targetReview: selectTargetReviewInfo,
    targetReviewToMap: selectTargetReviewInfoToMap,
    targetRestaurant: selectTargetRestaurantInfo
});

const mapDispatchToProps = dispatch => ({
    setAdminCurrentPage: pageNumber => dispatch(setAdminCurrentPage(pageNumber)),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetDeleteReviewStatus: () => dispatch(resetDeleteReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
    resetUserUpdateStatus: () => dispatch(resetUserUpdateStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReviewPage);