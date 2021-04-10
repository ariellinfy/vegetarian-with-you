import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectReviewsCollection, selectReviewSortbyFilter } from '../../redux/review/review-selectors';
import { setReviewSortbyFilter, requestReviewsStart } from '../../redux/review/review-actions';

import ReviewPreview from '../../components/review-preview/review-preview-component';
import { Typography, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import './restaurant-review-style.scss';

const RestaurantReview = ({ currentUser, reviewCount, query, 
    reviewsCollection, reviewSortbyFilter, setReviewSortbyFilter, requestReviewsStart, history }) => {

    const handleChange = event => {
        setReviewSortbyFilter(event.target.value);

        query = event.currentTarget.dataset.query ? `${query}${event.currentTarget.dataset.query}` : query;
        requestReviewsStart(query);
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
                        onClick={() => {
                            // resetRequestRestaurantsStatus();
                            // resetFilteredRestaurants();
                            Object.keys(currentUser).length ? (history.push('/createreview')) : (history.push('/signin'))}}>
                        Write a Review
                    </Button>
                </div>
            </div>
            {
                reviewsCollection.map(review => (
                    <ReviewPreview key={review.review_id} userId={currentUser.user_id} review={review} />
                ))
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    reviewsCollection: selectReviewsCollection,
    reviewSortbyFilter: selectReviewSortbyFilter,
});

const mapDispatchToProps = dispatch => ({
    setReviewSortbyFilter: filter => dispatch(setReviewSortbyFilter(filter)),
    requestReviewsStart: query => dispatch(requestReviewsStart(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantReview));