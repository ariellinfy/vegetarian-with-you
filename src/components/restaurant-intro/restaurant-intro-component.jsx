import React from 'react';
import { Typography } from '@material-ui/core';
import restaurantImage from "../../assets/background/temp.jpg";
import './restaurant-intro-style.scss';

const RestaurantIntro = ({ restaurantDetail: { restaurant_name, address, city, region, country, postal_code } }) => {

    return (
        <div className='restaurant-intro-container'>
            <div className='intro-container' elevation={0}>
                <div className='restaurant-info'>
                    <img className='restaurant-image' alt="restaurant-image" src={restaurantImage}/>
                    <div className='restaurant-detail'>
                        <Typography gutterBottom variant="h4">
                            {restaurant_name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p" className='restaurant-location'>
                            {/* 200 8 Ave SE | Olympic Plaza, Calgary, Alberta T2G 0K7, Canada */}
                            {
                                `${address}, ${city ? city : ''}, ${region} ${postal_code}, ${country}`
                            }
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantIntro;