import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import restaurantImage from "../../assets/temp.jpg";
import './restaurant-intro-style.scss';

const RestaurantIntro = () => {

    return (
        <div className='restaurant-intro-container'>
            <div className='intro-container' elevation={0}>
                <div className='restaurant-info'>
                    <img className='restaurant-image' alt="restaurant-image" src={restaurantImage}/>
                    <div className='restaurant-detail'>
                        <Typography gutterBottom variant="h5" component="h2">
                            {/* {restaurantName} */}
                            Teatro Restaurant
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p" className='restaurant-location'>
                            {/* {restaurantCuisineCity}, {restaurantCountry} */}
                            200 8 Ave SE | Olympic Plaza, Calgary, Alberta T2G 0K7, Canada
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantIntro;