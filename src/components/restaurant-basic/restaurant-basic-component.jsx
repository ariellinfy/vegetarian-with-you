import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRestaurantToBeUpdate } from '../../redux/restaurant/restaurant-actions';

import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Divider, Link, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { orange, green, grey } from '@material-ui/core/colors';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import './restaurant-basic-style.scss';

const RestaurantBasic = ({ targetRestaurant, currentUser, setRestaurantToBeUpdate, history }) => {
    
    let { restaurant_name, address, city, region, country, postal_code, phone, website, 
        type, cuisine, overall_rate, price_range, review_count } = targetRestaurant;

    type = type === undefined ? '' : type;
    cuisine = cuisine === undefined ? '' : cuisine;

    if (Math.round(price_range) === 1) {
        price_range = 'cheap eats';
    } else if (Math.round(price_range) === 2) {
        price_range = 'mid-range';
    } else if (Math.round(price_range) === 3) {
        price_range = 'fine dining';
    } else {
        price_range = 'unknown';
    };

    const tel = (phone || '').replace(/[()-]/g, "").replace(/\s/g, "");
    const target_lat = 0;
    const target_lng = 0;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleRestaurantClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRestaurantClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateRestaurant = () => {
        setRestaurantToBeUpdate(targetRestaurant);
        history.push('/updaterestaurant')
        setAnchorEl(null);
    };

    return (
        <div className='restaurant-header-container'>
            <div className='restaurant-header-action'>
                <Button type='button' onClick={() => history.goBack()} className='header-btn' startIcon={<KeyboardBackspaceIcon />}>
                    Go Back
                </Button>
                <Button type='button' className='header-btn' variant="outlined" color='primary' startIcon={<AddIcon />}
                    onClick={() => history.push('/createrestaurant')}>
                    Add a Restaurant
                </Button>
            </div>

            <div className='restaurant-header-basic-container'>
                <div className='restaurant-basic-header'>
                    <Typography className='restaurant-name' variant="h3">{restaurant_name}</Typography>
                    {
                        Object.keys(currentUser).length ? (
                            <div className='update-btn'>
                                <IconButton onClick={handleRestaurantClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="update-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleRestaurantClose}
                                >
                                    <MenuItem onClick={handleUpdateRestaurant} >Update Restaurant</MenuItem>
                                </Menu>
                            </div>
                        ) : null
                    }
                </div>
                
                <div className='restaurant-basic-detail'>
                    <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='overall-rate' component="span" variant="body1">{(overall_rate || 0).toFixed(2)}</Typography>
                        <Rating
                            name="overall-rating"
                            value={overall_rate || 0}
                            precision={0.5}
                            readOnly 
                        />
                        <Typography className='overall-rate' component="span" variant="body2">{review_count} reviews</Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='capitalize-text' component="span" variant="body1">
                            {
                                cuisine.length ? (`${cuisine}`) : (``)
                            }
                            {
                                type.length ? (cuisine.length ? `, ${type}` : `${type}`) : (``)
                            }
                            {
                                price_range !== 'unknown' ? (cuisine.length || type.length ? `, ${price_range}` : `${price_range}`) : (``)
                            }
                        </Typography>
                    </Box>
                </div>

                <div className='restaurant-basic-detail'>
                    <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                        <LocationOnIcon style={{ color: green[500] }} fontSize="small" />
                        <Link href={"https://maps.google.com?q="+target_lat+","+target_lng} target="_blank" rel="noopener">
                            <Typography className='display-item' component="span" variant="body1">    
                                {
                                    city ? (`${address}, ${city}, ${region} ${postal_code} ${country}`) : (`${address}, ${region} ${postal_code} ${country}`)
                                }
                            </Typography>
                        </Link>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                        <PhoneIcon style={{ color: orange[700] }} fontSize="small" />
                        <Link href={`tel:${tel}`}>
                            <Typography className='display-item' component="span" variant="body1">{phone}</Typography>
                        </Link>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                        <OpenInNewIcon style={{ color: grey[800] }} fontSize="small" />
                        <Link href={website} target="_blank" rel="noopener">
                            <Typography className='display-item' component="span" variant="body1">
                                    website
                            </Typography>
                        </Link>
                    </Box>
                </div>
            </div>
            
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    setRestaurantToBeUpdate: targetRestaurant => dispatch(setRestaurantToBeUpdate(targetRestaurant)),
});

export default withRouter(connect(null, mapDispatchToProps)(RestaurantBasic));
