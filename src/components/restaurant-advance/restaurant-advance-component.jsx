import React, { useState } from 'react';

import { Typography, Box, Paper, Link } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import './restaurant-advance-style.scss';

const RestaurantAdvance = () => {


    return (
        <div className='restaurant-category restaurant-advance'>
            <Paper id='ratings' className='advance-container'>
                <Typography className='paper-title' component="legend">Ratings</Typography>

                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='overall-rate' component="span">{overallRate}</Typography>
                        <Rating
                            className='rate'
                            name="overall-rating"
                            value={overallRate}
                            precision={0.5}
                            readOnly 
                        />
                    <Typography className='overall-rate smaller' component="span">{reviewCount} reviews</Typography>
                </Box>
                
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Food</Typography>
                    <Rating
                        className='rate'
                        name="food-rate"
                        value={foodRate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Service</Typography>
                    <Rating
                        className='rate'
                        name="service-rate"
                        value={serviceRate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Value</Typography>
                    <Rating
                        className='rate'
                        name="value-rate"
                        value={valueRate}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Atmosphere</Typography>
                    <Rating
                        className='rate'
                        name="atmosphere-rate"
                        value={atmosphereRate}
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
                        <Typography className='item contact' component="span">{`${restaurantAddress}, ${restaurantCity}, ${restaurantRegion} ${restaurantPostalCode} ${restaurantCountry}`}</Typography>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        {CallIcon}
                        <Typography className='item contact' component="span">{restaurantPhone}</Typography>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        <i class="fa fa-external-link-alt"></i>
                        <Typography className='item contact' component="span">
                            <Link href={`${restaurantWebsite}`} target="_blank" rel="noopener">
                                {restaurantWebsite}
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
                            restaurantWifi === 'yes' ? [CheckIcon] : (restaurantWifi === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Free Wifi</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            restaurantTakeaway === 'yes' ? [CheckIcon] : (restaurantTakeaway === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Takeaway</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            restaurantDelivery === 'yes' ? [CheckIcon] : (restaurantDelivery === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Delivery</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            restaurantPungent === 'yes' ? [CheckIcon] : (restaurantPungent === 'no' ? [ClearIcon] : <i class="fa fa-question"></i>) 
                        }
                        <Typography className='item feature' component="span">Exclude 5 pungent vegetables</Typography>
                    </Box>
                </div>
            </Paper>

        </div>
    )
}

export default RestaurantAdvance;