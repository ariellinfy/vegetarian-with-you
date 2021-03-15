import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import './search-bar-style.scss';

const SearchBar = () => {


    return (
        <div className='search-bar-container'>
            <TextField
                id="search-input"
                className='search-input'
                type='text'
                value=''
                placeholder='Search...'
                onChange=''
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><i className="fa fa-search"></i></InputAdornment>
                }}
            />
        </div>
    )
}

export default SearchBar;