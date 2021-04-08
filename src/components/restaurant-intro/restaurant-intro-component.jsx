import React from 'react';
import { Typography } from '@material-ui/core';
import restaurantImage from "../../assets/background/temp.jpg";
import './restaurant-intro-style.scss';

const RestaurantIntro = ({ targetRestaurant }) => {

    const { restaurant_name, address, city, region, country, postal_code } = targetRestaurant;

    return (
        <div className='restaurant-intro-container'>
            <div className='intro-container' elevation={0}>
                <div className='restaurant-info'>
                    <img className='restaurant-image' alt={restaurant_name} src={restaurantImage}/>
                    <div className='restaurant-detail'>
                        <Typography gutterBottom variant="h4">
                            {restaurant_name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p" className='restaurant-location'>
                            {
                            city ? (`${address}, ${city}, ${region} ${postal_code} ${country}`) : (`${address}, ${region} ${postal_code} ${country}`)
                            }
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestaurantIntro;