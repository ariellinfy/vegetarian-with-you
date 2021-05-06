import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectReviewsCollection, selectReviewSortbyFilter } from '../../redux/review/review-selectors';
import { setReviewSortbyFilter, requestReviewsStart, requestReviewsAuthStart } from '../../redux/review/review-actions';

import createImage from '../../assets/dog.svg';
import ReviewPreview from '../../components/review-preview/review-preview-component';
import { Typography, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import './restaurant-review-style.scss';

const RestaurantReview = ({ currentUser, targetRestaurant, query, 
    reviewsCollection, reviewSortbyFilter, setReviewSortbyFilter, requestReviewsStart, requestReviewsAuthStart, history }) => {

    const { restaurant_id, review_count, restaurant_name, country } = targetRestaurant;

    let currentUserToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')).token : '';

    const handleChange = event => {
        setReviewSortbyFilter(event.target.value);
        query = event.currentTarget.dataset.query ? `?&restaurantId=${restaurant_id}${event.currentTarget.dataset.query}` : query;
        Object.keys(currentUser).length ? requestReviewsAuthStart({ query, currentUserToken }) : requestReviewsStart({ query });
    };

    return (
        <div className='restaurant-category customer-reviews'>
            <div className='review-header'>
                <div className='review-header-1'>
                    <Typography variant="h6">Reviews ({review_count})</Typography>
                    <FormControl variant="outlined" className='sort-by-container'>
                        <Select
                            id="review-sortby-filter"
                            value={reviewSortbyFilter}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Sort By"} data-query={"&sortBy=last_modified:desc"}>Sort By</MenuItem>
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
                reviewsCollection.length ? reviewsCollection.map(review => (
                    <ReviewPreview key={review.review_id} currentUser={currentUser} review={review} query={query} />
                )) : (
                    <div className='no-review'>
                        <img alt='create' src={createImage} />
                        <Typography variant="subtitle1">There are no reviews for {restaurant_name}, {country} yet.</Typography>
                        <Typography variant="subtitle1">Be the first to write a review!</Typography> 
                    </div>
                )
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
    requestReviewsStart: data => dispatch(requestReviewsStart(data)),
    requestReviewsAuthStart: data => dispatch(requestReviewsAuthStart(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantReview));