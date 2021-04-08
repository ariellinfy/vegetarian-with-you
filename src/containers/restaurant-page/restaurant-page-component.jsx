import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';
import { selectReviewsCollection, selectReviewSortbyFilter } from '../../redux/review/review-selectors';
import { setReviewSortbyFilter, requestReviewsStart } from '../../redux/review/review-actions';

import RestaurantBasic from '../../components/restaurant-basic/restaurant-basic-component';
import RestaurantImageGallery from '../../components/restaurant-images/restaurant-images-component';
import RestaurantAdvance from '../../components/restaurant-advance/restaurant-advance-component';
import ReviewPreview from '../../components/review-preview/review-preview-component';

import { Typography, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import './restaurant-page-style.scss';


const RestaurantPage = ({ targetRestaurant, reviewsCollection, reviewSortbyFilter, setReviewSortbyFilter, requestReviewsStart }) => {
    const { restaurant_id, review_count } = targetRestaurant;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [targetRestaurant]);

    const handleChange = event => {
        setReviewSortbyFilter(event.target.value);

        let query = `?${event.currentTarget.dataset.query}`
        requestReviewsStart({ restaurant_id, query });
    };

    return (
        <div className='restaurant-page'>
            <div className='restaurant-container'>
                
                <RestaurantBasic targetRestaurant={targetRestaurant} />

                <RestaurantImageGallery />

                <RestaurantAdvance targetRestaurant={targetRestaurant} />
                
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
                                    <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                                    <MenuItem value={"Most recent"} data-query={"&sortBy=overall_rate:desc"}>Most recent</MenuItem>
                                    <MenuItem value={"Top reviews"} data-query={"&sortBy=overall_rate:desc"}>Top reviews</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='review-header-2'>
                            <Button variant="contained" color="primary" className='write-review'>
                                Write a Review
                            </Button>
                        </div>
                    </div>
                    {
                        // review data to map
                    }
                    <ReviewPreview />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    targetRestaurant: selectTargetRestaurantInfo,
    reviewsCollection: selectReviewsCollection,
    reviewSortbyFilter: selectReviewSortbyFilter
});

const mapDispatchToProps = dispatch => ({
    setReviewSortbyFilter: () => dispatch(setReviewSortbyFilter()),
    requestReviewsStart: info => dispatch(requestReviewsStart(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);