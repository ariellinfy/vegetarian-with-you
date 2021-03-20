import React, { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar-component';
import SortByButton from '../../components/sort-by-btn/sort-by-btn-component';
import CreateNewButton from '../../components/create-new-btn/create-new-btn-component';
import RestaurantPreviewOne from '../../components/restaurant-preview-1/restaurant-preview-1-component';
import './explore-page-style.scss';

const ExplorePage = () => {


    return (
        <div className='explore-page'>
            <div className='explore-container'>
                <h1>Explore</h1>
                <div className='explore-header'>
                    <div className='explore-header-1'>
                        <SearchBar type='restaurant' placeholder='Search...' />
                        <SortByButton />
                    </div>
                    <div className='explore-header-2'>
                        <CreateNewButton btnType='restaurant profile' />
                    </div>
                </div>
                <div className='explore-body'>
                    <RestaurantPreviewOne />
                    <RestaurantPreviewOne />
                    <RestaurantPreviewOne />
                    <RestaurantPreviewOne />
                    <RestaurantPreviewOne />
                </div>
            </div>
        </div>
    )
}

export default ExplorePage;