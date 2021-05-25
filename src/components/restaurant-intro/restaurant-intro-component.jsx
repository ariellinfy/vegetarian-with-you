import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Typography } from '@material-ui/core';
import restaurantDefault from "../../assets/restaurant-default.svg";
import './restaurant-intro-style.scss';

const RestaurantIntro = ({ targetRestaurant }) => {

    let { restaurant_name, address, city, region, country, postal_code, photos } = targetRestaurant;
    photos = photos || [];

    return (
        <div className='restaurant-intro-container'>
            <div className='intro-container' elevation={0}>
                <div className='restaurant-info'>
                    {
                        photos.length ? (
                            <Image cloud_name='alinfy' publicId={photos[0].path} className='restaurant-image' alt={restaurant_name}>
                                <Transformation quality="auto" fetchFormat="auto" />
                            </Image>
                        ) : <img className='restaurant-image' alt={restaurant_name} src={restaurantDefault}/>
                    }
                    <div className='restaurant-detail'>
                        <Typography gutterBottom variant="h4">
                            {restaurant_name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" component="p" className='restaurant-location'>
                            {
                                city ? (`${address}, ${city}, ${region} ${postal_code}, ${country}`) : (`${address}, ${region} ${postal_code}, ${country}`)
                            }
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestaurantIntro;