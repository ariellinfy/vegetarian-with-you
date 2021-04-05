import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { requestAllRestaurantsStart, setSortbyFilter, resetFilteredRestaurants, resetKeyword } from '../../redux/restaurant/restaurant-actions';
import { selectSortbyFilter } from '../../redux/restaurant/restaurant-selectors';

import { FormControl, Select, MenuItem } from '@material-ui/core';
import './sort-by-btn-style.scss';

const SortByButton = ({ sortbyFilter, requestAllRestaurantsStart, setSortbyFilter, resetFilteredRestaurants, resetKeyword }) => {

    const handleChange = event => {
        console.log(event.target.value, event.currentTarget.dataset.query)
        setSortbyFilter(event.target.value);
        resetKeyword();
        resetFilteredRestaurants();
        requestAllRestaurantsStart("?" + event.currentTarget.dataset.query)
    };

    return (
        <div className='sort-by-btn-container'>
            <FormControl variant="outlined" className='sort-by-container'>
                <Select
                    id="sortby-filter"
                    value={sortbyFilter}
                    onChange={handleChange}
                >
                    <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                    <MenuItem value={"Most recent"} data-query={"&sortBy=create_at:desc"}>Rating</MenuItem>
                    <MenuItem value={"Top reviews"} data-query={"&sortBy=overall_rate:desc"}>Number of reviews</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    sortbyFilter: selectSortbyFilter
});

const mapDispatchToProps = dispatch => ({
    requestAllRestaurantsStart: query => dispatch(requestAllRestaurantsStart(query)),
    setSortbyFilter: filter => dispatch(setSortbyFilter(filter)),
    resetFilteredRestaurants: () => dispatch(resetFilteredRestaurants()),
    resetKeyword: () => dispatch(resetKeyword()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByButton);