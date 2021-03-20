import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './sort-by-btn-style.scss';

const SortByButton = () => {

    return (
        <div className='sort-by-btn-container'>
            <FormControl variant="outlined" className='sort-by-container'>
                <Select
                    id="sortby-filter"
                    value='Sort By'
                    onChange=''
                >
                    <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                    <MenuItem value={"Most recent"} data-query=''>Rating</MenuItem>
                    <MenuItem value={"Top reviews"} data-query=''>Number of reviews</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SortByButton;