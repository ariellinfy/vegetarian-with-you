import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from "react-router-dom";
import { resetCreateReviewStatus } from '../../redux/review/review-actions';
import { selectReviewCreateSuccess, selectTargetReviewInfo, selectTargetReviewInfoToMap } from '../../redux/review/review-selectors';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';

import ReviewForm from '../../components/review-form/review-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './create-review-page-style.scss';

const CreateReviewPage = ({ createSuccess, targetReview, targetReviewToMap, resetCreateReviewStatus, targetRestaurant }) => {
    const currentUserToken = localStorage.getItem('token');

    return (
        <div className='create-review-page'>
            {
                createSuccess ? (
                    <div className="review-success">
                        <div className="review-header">
                            <Typography variant="h5">
                                You've successfully uploaded your 
                                <span className="review-name">
                                    {targetReview.review_title}
                                </span>
                                 review!
                            </Typography>
                        </div>
                        <Card className="review-body" elevation={0}>

                                {
                                    targetReviewToMap ? (
                                        targetReviewToMap
                                        .filter((item, index) => index > 1 && index < targetReviewToMap.length - 4)
                                        .map(item => (
                                        <Typography key={item[0]} className="review-detail" color="textPrimary">
                                            {item[0].toUpperCase()}: {item[1]}
                                        </Typography>
                                    ))) : null
                                }

                        </Card>
                        <div className="review-actions">
                            <Typography variant="h5">
                                What's next?
                            </Typography>
                            <Button component={Link} to={'/explore'} variant="outlined" color="primary" className="btn-next" onClick={() => resetCreateReviewStatus()}>Explore more restaurants</Button>
                            <Button component={Link} to={'/useraccount'} variant="contained" color="primary" className="btn-next" onClick={() => resetCreateReviewStatus()}>View my reviews</Button>
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
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewPage);