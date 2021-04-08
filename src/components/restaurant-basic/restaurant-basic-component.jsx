import React from 'react';

import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Divider, Link } from '@material-ui/core';
import './restaurant-basic-style.scss';

const RestaurantBasic = ({ targetRestaurant }) => {
    const { restaurant_name, address, city, region, country, postal_code, phone, website, 
        type, cuisine, overall_rate, price_range, review_count } = targetRestaurant;

    if (Math.round(price_range) === 1) {
        price_range = 'cheap eats';
    } else if (Math.round(price_range) === 2) {
        price_range = 'mid-range';
    } else if (Math.round(price_range) === 3) {
        price_range = 'fine dining';
    } else {
        price_range = 'unknown';
    };

    return (
        <div className='restaurant-category restaurant-basic'>
            <Typography className='restaurant-name' variant="h3">{restaurant_name}</Typography>

            <div className='restaurant-basic-detail'>
                <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='display-item overall-rate' component="span">{overall_rate}</Typography>
                    <Rating
                        name="overall-rating"
                        value={overall_rate}
                        precision={0.5}
                        readOnly 
                    />
                    <Typography className='display-item overall-rate smaller' component="span">{review_count} reviews</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='display-item capitalize-text' component="span">
                        {
                            price_range !== 'unknown' ? (`${cuisine}, ${type}, ${price_range}`) : (`${cuisine}, ${type}`)
                        }
                    </Typography>
                </Box>
            </div>

            <div className='restaurant-basic-detail'>
                <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='display-item' component="span">
                        {
                            city ? (`${address}, ${city}, ${region} ${postal_code} ${country}`) : (`${address}, ${region} ${postal_code} ${country}`)
                        }
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='display-item' component="span">{phone}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='display-item' component="span">
                        <Link href={website} target="_blank" rel="noopener">
                            {website}
                        </Link>
                    </Typography>
                </Box>
            </div>

        </div>
    )
};

export default RestaurantBasic;