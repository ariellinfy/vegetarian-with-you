import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './search-bar-style.scss';

const SearchBar = ({ type, children, onChange, value, ...otherProps }) => (
    <div className='search-bar-container'>
        <TextField
            className='search-input'
            type='text'
            value={value}
            onChange={onChange}
            placeholder={children}
            variant="outlined"
            {...otherProps}
            InputProps={{
                startAdornment: <InputAdornment position="start">{type === 'restaurant' ? <SearchIcon fontSize="small" /> : <LocationOnIcon fontSize="small" />}</InputAdornment>
            }}
        />
    </div>
);

export default SearchBar;