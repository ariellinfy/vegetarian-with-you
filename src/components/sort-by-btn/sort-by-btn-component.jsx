import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { requestAllRestaurantsStart, setRestaurantSortbyFilter, resetFilteredRestaurants } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantSortbyFilter } from '../../redux/restaurant/restaurant-selectors';

import { FormControl, Select, MenuItem } from '@material-ui/core';
import './sort-by-btn-style.scss';

const SortByButton = ({ restaurantSortbyFilter, requestAllRestaurantsStart, setRestaurantSortbyFilter, resetFilteredRestaurants }) => {

    const handleChange = event => {
        setRestaurantSortbyFilter(event.target.value);
        resetFilteredRestaurants();
        requestAllRestaurantsStart("?" + event.currentTarget.dataset.query);
    };

    return (
        <div className='sort-by-btn-container'>
            <FormControl variant="outlined" className='sort-by-container'>
                <Select
                    id="restaurant-sortby-filter"
                    value={restaurantSortbyFilter}
                    onChange={handleChange}
                >
                    <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                    <MenuItem value={"Most recent"} data-query={"&sortBy=overall_rate:desc"}>Rating</MenuItem>
                    <MenuItem value={"Top reviews"} data-query={"&sortBy=review_count:desc"}>Number of reviews</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    restaurantSortbyFilter: selectRestaurantSortbyFilter
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    setRestaurantSortbyFilter: filter => dispatch(setRestaurantSortbyFilter(filter)),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByButton);