import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectReviewsWithUserFeedbacks, selectReviewSortbyFilter } from '../../redux/review/review-selectors';
import { setReviewSortbyFilter, requestReviewsStart, requestUserFeedbacksStart, matchReviewsWithUserFeedbacks } from '../../redux/review/review-actions';

import ReviewPreview from '../../components/review-preview/review-preview-component';
import { Typography, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import './restaurant-review-style.scss';

const RestaurantReview = ({ currentUser, reviewCount, query, restaurantId,
    reviewsWithUserFeedback, reviewSortbyFilter, matchReviewsWithUserFeedbacks,
    setReviewSortbyFilter, requestReviewsStart, requestUserFeedbacksStart, history }) => {

    const currentUserToken = localStorage.getItem('token');

    const handleChange = event => {
        setReviewSortbyFilter(event.target.value);
        query = event.currentTarget.dataset.query ? `${query}${event.currentTarget.dataset.query}` : query;
        requestReviewsStart(query);
        requestUserFeedbacksStart({ restaurantId, currentUserToken });
        matchReviewsWithUserFeedbacks();
    };

    return (
        <div className='restaurant-category customer-reviews'>
            <div className='review-header'>
                <div className='review-header-1'>
                    <Typography variant="h6">Reviews ({reviewCount})</Typography>
                    <FormControl variant="outlined" className='sort-by-container'>
                        <Select
                            id="review-sortby-filter"
                            value={reviewSortbyFilter}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                            <MenuItem value={"Top reviews"} data-query={"&sortBy=helpful_count:desc"}>Top reviews</MenuItem>
                            <MenuItem value={"Most recent"} data-query={"&sortBy=create_at:desc"}>Most recent</MenuItem>
                            <MenuItem value={"Avg rating"} data-query={"&sortBy=overall_rate:desc"}>Avg rating</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='review-header-2'>
                    <Button variant="contained" color="primary" className='review-btn' startIcon={<CreateIcon />}
                        onClick={() => history.push('/createreview')}>
                        Write a Review
                    </Button>
                </div>
            </div>
            {
                reviewsWithUserFeedback.map(review => (
                    <ReviewPreview key={review.review_id} currentUser={currentUser} userId={currentUser.user_id} review={review} restaurantId={restaurantId} query={query} />
                ))
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    reviewsWithUserFeedback: selectReviewsWithUserFeedbacks,
    reviewSortbyFilter: selectReviewSortbyFilter,
});

const mapDispatchToProps = dispatch => ({
    setReviewSortbyFilter: filter => dispatch(setReviewSortbyFilter(filter)),
    requestReviewsStart: query => dispatch(requestReviewsStart(query)),
    requestUserFeedbacksStart: data => dispatch(requestUserFeedbacksStart(data)),
    matchReviewsWithUserFeedbacks: () => dispatch(matchReviewsWithUserFeedbacks()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantReview));