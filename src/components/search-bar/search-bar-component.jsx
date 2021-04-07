import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import './search-bar-style.scss';

const SearchBar = ({ type, children, onChange, value, ...otherProps }) => {

    return (
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
                    startAdornment: <InputAdornment position="start">{type === 'restaurant' ? <i className="fa fa-search"></i> : <i className="fa fa-map-marker"></i>}</InputAdornment>
                }}
            />
        </div>
    )
}

export default SearchBar;