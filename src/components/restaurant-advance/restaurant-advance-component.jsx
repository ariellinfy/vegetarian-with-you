import React from 'react';

import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Paper, Link } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import './restaurant-advance-style.scss';

const RestaurantAdvance = ({ targetRestaurant }) => {
    const { address, city, region, country, postal_code, 
        phone, website, review_count,
        breakfast, brunch, lunch, dinner,
        free_wifi, takeout, delivery, exclude_pungent,
        overall_rate, food_rate, service_rate, value_rate, atmosphere_rate } = targetRestaurant;

    return (
        <div className='restaurant-category restaurant-advance'>
            <Paper id='ratings' className='advance-container'>
                <Typography className='paper-title' component="legend">Ratings</Typography>

                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='overall-rate' component="span">{overall_rate}</Typography>
                        <Rating
                            className='rate'
                            name="overall-rating"
                            value={overall_rate}
                            precision={0.5}
                            readOnly 
                        />
                    <Typography className='overall-rate smaller' component="span">{review_count} reviews</Typography>
                </Box>

                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Food</Typography>
                    <Rating
                        className='rate'
                        name="food-rate"
                        value={food_rate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Service</Typography>
                    <Rating
                        className='rate'
                        name="service-rate"
                        value={service_rate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Value</Typography>
                    <Rating
                        className='rate'
                        name="value-rate"
                        value={value_rate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Atmosphere</Typography>
                    <Rating
                        className='rate'
                        name="atmosphere-rate"
                        value={atmosphere_rate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
            </Paper>

            <Paper id='meals' className='advance-container'>
                <Typography className='paper-title' component="legend">Meals</Typography>

                <div className='paper-container meals'>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            breakfast === true ? [CheckIcon] : [ClearIcon] 
                        }
                        <Typography className='item meal' component="span">Breakfast</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            brunch === true ? [CheckIcon] : [ClearIcon] 
                        }
                        <Typography className='item meal' component="span">Brunch</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            lunch === true ? [CheckIcon] : [ClearIcon]  
                        }
                        <Typography className='item meal' component="span">Lunch</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            dinner === true ? [CheckIcon] : [ClearIcon] 
                        }
                        <Typography className='item meal' component="span">Dinner</Typography>
                    </Box>
                </div>
            </Paper>

            <Paper id='contact' className='advance-container'>
                <Typography className='paper-title' component="legend">Location and Contact</Typography>

                <div className='paper-container contacts'>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        {RoomIcon}
                        <Typography className='item contact' component="span">
                            {
                                city ? (`${address}, ${city}, ${region} ${postal_code} ${country}`) : (`${address}, ${region} ${postal_code} ${country}`)
                            }
                        </Typography>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        {CallIcon}
                        <Typography className='item contact' component="span">{phone}</Typography>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        <i class="fa fa-external-link-alt"></i>
                        <Typography className='item contact' component="span">
                            <Link href={website} target="_blank" rel="noopener">
                                {website}
                            </Link>
                        </Typography>
                    </Box>
                </div>
            </Paper>

            <Paper id='features' className='advance-container'>
                <Typography className='paper-title' component="legend">Features</Typography>
                <div className='paper-container features'>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            free_wifi === 'yes' ? [CheckIcon] : (free_wifi === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Free Wifi</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            takeout === 'yes' ? [CheckIcon] : (takeout === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Takeout</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            delivery === 'yes' ? [CheckIcon] : (delivery === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Delivery</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            exclude_pungent === 'yes' ? [CheckIcon] : (exclude_pungent === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Exclude 5 pungent vegetables</Typography>
                    </Box>
                </div>
            </Paper>

        </div>
    )
}

export default RestaurantAdvance;