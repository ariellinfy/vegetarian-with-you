import React, { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar-component';
import RestaurantPreviewTwo from '../../components/restaurant-preview-2/restaurant-preview-2-component';
import './find-restaurant-page-style.scss';

const FindRestaurantPage = () => {


    return (
        <div className='find-restaurant-page'>
            <h1>Review a place you've visited</h1>
            <div className='find-restaurant-header'>
                <SearchBar type='location' placeholder='Find restaurant...' />
                <SearchBar type='restaurant' placeholder='City or country' />
            </div>
            <div className='find-restaurant-body'>
                <RestaurantPreviewTwo />
                <RestaurantPreviewTwo />
                <RestaurantPreviewTwo />
                <RestaurantPreviewTwo />
                <RestaurantPreviewTwo />
                {/* <CreateNewButton btnType='restaurant profile' /> */}
            </div>
        </div>
    )
}

export default FindRestaurantPage;