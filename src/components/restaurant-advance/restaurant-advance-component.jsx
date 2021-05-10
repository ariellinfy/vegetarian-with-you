import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Paper, Link } from '@material-ui/core';
import { red, pink, amber, blue, green, deepPurple } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import './restaurant-advance-style.scss';

const RestaurantAdvance = ({ targetRestaurant }) => {
    
    const { address, city, region, country, postal_code, 
        phone, website, review_count,
        breakfast, brunch, lunch, dinner,
        free_wifi, takeout, delivery, exclude_pungent,
        overall_rate, food_rate, service_rate, value_rate, atmosphere_rate } = targetRestaurant;
        
    const tel = (phone || '').replace(/[()-]/g, "").replace(/\s/g, "");
    const fullAddress = city ? `${address}, ${city}, ${region} ${postal_code}, ${country}` : `${address}, ${region} ${postal_code}, ${country}`;

    return (
        <div className='restaurant-category restaurant-advance'>
            <Paper id='ratings' className='advance-container'>
                <Typography className='paper-title' component="legend">Ratings</Typography>

                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <div className='overall-rate-container'>
                        <Typography className='overall-rate' component="span" variant='body1'>{(overall_rate || 0).toFixed(2)}</Typography>
                        <Rating
                            className='rate'
                            name="overall-rating"
                            value={overall_rate || 0}
                            precision={0.5}
                            readOnly 
                        />
                    </div>
                    <Typography className='overall-rate' component="span" variant='body2'>{review_count} reviews</Typography>
                </Box>

                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Food</Typography>
                    <Rating
                        className='rate'
                        name="food-rate"
                        value={food_rate || 0}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Service</Typography>
                    <Rating
                        className='rate'
                        name="service-rate"
                        value={service_rate || 0}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Value</Typography>
                    <Rating
                        className='rate'
                        name="value-rate"
                        value={value_rate || 0}
                        precision={0.5}
                        readOnly 
                    />
                </Box>
                <Box className='rate-container' component="fieldset" mb={3} borderColor="transparent">
                    <Typography className='rate-title' component="span">Atmosphere</Typography>
                    <Rating
                        className='rate'
                        name="atmosphere-rate"
                        value={atmosphere_rate || 0}
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
                            breakfast === 'true' ? <CheckIcon style={{ color: green[500] }} /> : <ClearIcon style={{ color: red[600] }} /> 
                        }
                        <Typography className='item meal' component="span">Breakfast</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            brunch === 'true' ? <CheckIcon style={{ color: green[500] }} /> : <ClearIcon style={{ color: red[600] }} /> 
                        }
                        <Typography className='item meal' component="span">Brunch</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            lunch === 'true' ? <CheckIcon style={{ color: green[500] }} /> : <ClearIcon style={{ color: red[600] }} />  
                        }
                        <Typography className='item meal' component="span">Lunch</Typography>
                    </Box>
                    <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            dinner === 'true' ? <CheckIcon style={{ color: green[500] }} /> : <ClearIcon style={{ color: red[600] }} /> 
                        }
                        <Typography className='item meal' component="span">Dinner</Typography>
                    </Box>
                </div>
            </Paper>

            <Paper id='contact' className='advance-container'>
                <Typography className='paper-title' component="legend">Location and Contact</Typography>

                <div className='paper-container contacts'>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        <RoomIcon style={{ color: blue[400] }} fontSize="small" />
                        <Link href={"https://maps.google.com?q="+fullAddress} target="_blank" rel="noopener">
                            <Typography className='item contact' component="p" variant="body1">    
                                { fullAddress }
                            </Typography>
                        </Link>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        <CallIcon style={{ color: pink[400] }} fontSize="small" />
                        <Link href={`tel:${tel}`}>
                            <Typography className='item contact' component="span" variant="body1">{phone}</Typography>
                        </Link>
                    </Box>
                    <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            website ? (
                                <>
                                <OpenInNewIcon style={{ color: deepPurple[500] }} fontSize="small" />
                                <Link href={website} target="_blank" rel="noopener">
                                    <Typography className='item contact' component="span" variant="body1">
                                        website
                                    </Typography>
                                </Link>
                                </>
                            ) : null
                        }
                    </Box>
                </div>
            </Paper>

            <Paper id='features' className='advance-container'>
                <Typography className='paper-title' component="legend">Features</Typography>
                <div className='paper-container features'>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            free_wifi === 'yes' ? <CheckIcon style={{ color: green[500] }} /> : (free_wifi === 'no' ? <ClearIcon style={{ color: red[600] }} /> : <ContactSupportIcon style={{ color: amber[500] }} />) 
                        }
                        <Typography className='item feature' component="span">Free Wifi</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            takeout === 'yes' ? <CheckIcon style={{ color: green[500] }} /> : (takeout === 'no' ? <ClearIcon style={{ color: red[600] }} /> : <ContactSupportIcon style={{ color: amber[500] }} />) 
                        }
                        <Typography className='item feature' component="span">Takeout</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            delivery === 'yes' ? <CheckIcon style={{ color: green[500] }} /> : (delivery === 'no' ? <ClearIcon style={{ color: red[600] }} /> : <ContactSupportIcon style={{ color: amber[500] }} />) 
                        }
                        <Typography className='item feature' component="span">Delivery</Typography>
                    </Box>
                    <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                        {
                            exclude_pungent === 'yes' ? <CheckIcon style={{ color: green[500] }} /> : (exclude_pungent === 'no' ? <ClearIcon style={{ color: red[600] }} /> : <ContactSupportIcon style={{ color: amber[500] }} />) 
                        }
                        <Typography className='item feature' component="span">Exclude 5 pungent vegetables</Typography>
                    </Box>
                </div>
            </Paper>

        </div>
    )
};

export default RestaurantAdvance;