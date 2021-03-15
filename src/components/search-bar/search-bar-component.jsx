import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import './search-bar-style.scss';

const SearchBar = ({ type, ...otherProps }) => {

    return (
        <div className='search-bar-container'>
            <TextField
                id="search-input"
                className='search-input'
                type='text'
                value=''
                onChange=''
                variant="outlined"
                {...otherProps}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{type === 'restaurant' ? <i className="fa fa-search"></i> : <i className="fa fa-map-marker"></i>}</InputAdornment>
                }}
            />
        </div>
    )
}

export default SearchBar;