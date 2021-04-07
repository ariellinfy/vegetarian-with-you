import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from "react-router-dom";
import { resetUpdateReviewStatus } from '../../redux/review/review-actions';
import { selectReviewUpdateSuccess, selectTargetReviewInfo, selectTargetReviewInfoToMap } from '../../redux/review/review-selectors';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';

import ReviewForm from '../../components/review-form/review-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './update-review-page-style.scss';

const UpdateReviewPage = ({ updateSuccess, targetReview, targetReviewToMap, resetUpdateReviewStatus, targetRestaurant }) => {
    const currentUserToken = localStorage.getItem('token');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [updateSuccess]);

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
                                        .filter((item, index) => index > 0 && index < targetReviewToMap.length - 4)
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
                            <Button component={Link} to={'/explore'} variant="outlined" color="primary" className="btn-next" onClick={() => resetUpdateReviewStatus()}>Explore more restaurants</Button>
                            <Button component={Link} to={'/useraccount'} variant="contained" color="primary" className="btn-next" onClick={() => resetUpdateReviewStatus()}>View my reviews</Button>
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
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReviewPage);