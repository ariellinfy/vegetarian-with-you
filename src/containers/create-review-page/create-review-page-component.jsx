import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from "react-router-dom";
import { resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';
import { selectReviewCreateSuccess, selectTargetReviewInfo, selectTargetReviewInfoToMap } from '../../redux/review/review-selectors';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';

import ReviewForm from '../../components/review-form/review-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './create-review-page-style.scss';

const CreateReviewPage = ({ createSuccess, targetReview, targetReviewToMap, targetRestaurant,
    resetUpdateRestaurantStatus, resetRequestRestaurantsStatus, resetFilteredRestaurants, 
    resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestReviewsStatus, resetRequestUserReviewsStatus }) => {
        
    const currentUserToken = localStorage.getItem('token');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [createSuccess]);

    useEffect(() => {
        resetRequestRestaurantsStatus();
        resetFilteredRestaurants();
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetRequestReviewsStatus();
        resetRequestUserReviewsStatus();
    }, []);

    return (
        <div className='create-review-page'>
            {
                createSuccess ? (
                    <div className="review-success">
                        <div className="review-header">
                            <Typography variant="h5">You've successfully uploaded your review!</Typography>
                            <Typography variant="h5" className="review-name">{`--- ${targetReview.review_title} ---`}</Typography>
                        </div>
                        <Card className="review-body" elevation={0}>

                                {
                                    targetReviewToMap ? (
                                        targetReviewToMap
                                        .filter((item, index) => index > 1 && index < targetReviewToMap.length - 8)
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
                            <Button component={Link} to={'/useraccount'} variant="contained" color="primary" className="btn-next">View my reviews</Button>
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
    createSuccess: selectReviewCreateSuccess,
    targetReview: selectTargetReviewInfo,
    targetReviewToMap: selectTargetReviewInfoToMap,
    targetRestaurant: selectTargetRestaurantInfo
});

const mapDispatchToProps = dispatch => ({
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetRequestRestaurantsStatus: () => dispatch(resetRequestRestaurantsStatus()),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestReviewsStatus: () => dispatch(resetRequestReviewsStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewPage);