import React, { useState } from 'react';
import ReviewPreview from '../../components/review-preview/review-preview-component';

import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Divider, Paper, Link, Button, FormControl, Select, MenuItem, Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './restaurant-page-style.scss';

const list = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const ImageItem = ({url, selected}) => (
    <div className={`menu-item ${selected ? 'active' : ''}`}>
        <img
          style={{ height: "200px" }}
          alt="test"
          src={url}
        />
    </div>
);

export const ImageMenu = (list, selected) =>
    list.map(el => {
      const { original } = el;
      return <ImageItem url={original} key={original} selected={selected} />;
});

const RestaurantPage = () => {
    const [ restaurant, setRestaurant ] = useState({
        restaurantName: 'ABC FOOD',
        restaurantAddress: '57 Evanscove Manor NW',
        restaurantCity: 'Calgary',
        restaurantRegion: 'Alberta',
        restaurantCountry: 'Canada',
        restaurantPostalCode: 'T3P 0E5',
        restaurantPhone: '1-587-284-9712',
        restaurantWebsite: 'https://ariellinfy.com/',
        restaurantType: 'ovo-lacto',
        restaurantCuisine: 'chinese',
        breakfast: false,
        brunch: true,
        lunch: true,
        dinner: false,
        restaurantWifi: 'no',
        restaurantTakeaway: 'yes',
        restaurantDelivery: 'no',
        restaurantPungent: 'not sure'
    });

    const { restaurantName, 
        restaurantAddress, 
        restaurantCity, 
        restaurantRegion, 
        restaurantCountry, 
        restaurantPostalCode, 
        restaurantPhone,
        restaurantWebsite,
        restaurantType,
        restaurantCuisine,
        breakfast,
        brunch,
        lunch,
        dinner,
        restaurantWifi,
        restaurantTakeaway,
        restaurantDelivery,
        restaurantPungent
    } = restaurant;

    const [review, setReview] = useState({
        reviewCount: 100
    });
    const { reviewCount } = review;

    const [rate, setRate] = useState({
        overallRate: 3.5,
        foodRate: 4,
        serviceRate: 4,
        valueRate: 3.5,
        atmosphereRate: 2.5
    });
    const { overallRate, foodRate, serviceRate, valueRate, atmosphereRate } = rate;

    const [selected, setSelected] = useState('item1');

    const menu = ImageMenu(list, selected);

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className='restaurant-page'>
            <div className='restaurant-container'>
                <div className='restaurant-category restaurant-basic'>
                    <Typography className='restaurant-name' variant="h3">{restaurantName}</Typography>
                    <div className='restaurant-basic-detail'>
                        <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='display-item overall-rate' component="span">{overallRate}</Typography>
                            <Rating
                                name="overall-rating"
                                value={overallRate}
                                precision={0.5}
                                readOnly 
                            />
                            <Typography className='display-item overall-rate smaller' component="span">{reviewCount} reviews</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='display-item capitalize-text' component="span">{`${restaurantCuisine}, ${restaurantType}`}</Typography>
                        </Box>
                    </div>
                    <div className='restaurant-basic-detail'>
                        <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='display-item' component="span">{`${restaurantAddress}, ${restaurantCity}, ${restaurantRegion} ${restaurantPostalCode} ${restaurantCountry}`}</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='display-item' component="span">{restaurantPhone}</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box className='items-container' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='display-item' component="span">{restaurantWebsite}</Typography>
                        </Box>
                    </div>
                </div>
                
                <div className='restaurant-category restaurant-photos'>
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ChevronLeftIcon}
                        arrowRight={ChevronRightIcon}
                        selected={selected}
                        onSelect={key => setSelected({ selected: key })}
                        onClick={handleClickOpen}
                    />

                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                    >
                        <ImageGallery items={list} />
                    </Dialog>
                </div>

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
                
                <div className='restaurant-category customer-reviews'>
                    <div className='review-header'>
                        <div className='header-1'>
                            <Typography variant="h6">Reviews ({reviewCount})</Typography>
                            <FormControl variant="outlined" className='sort-by-container'>
                                <Select
                                id="sortby-filter"
                                value='Sort By'
                                onChange=''
                                >
                                    <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
                                    <MenuItem value={"Most recent"} data-query=''>Most recent</MenuItem>
                                    <MenuItem value={"Top reviews"} data-query=''>Top reviews</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='header-2'>
                            <Button variant="contained" color="primary" className='write-review'>
                                Write a Review
                            </Button>
                        </div>
                        
                    </div>
                    {
                        // review data to map
                    }
                    <ReviewPreview />
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage;