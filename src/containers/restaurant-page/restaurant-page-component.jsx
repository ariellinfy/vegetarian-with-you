import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReviewPreview from '../../components/review-preview/review-preview-component';
import RestaurantAdvance from '../../components/restaurant-advance/restaurant-advance-component';

import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Divider, Paper, Link, Button, FormControl, Select, MenuItem, Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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

                <RestaurantAdvance />
                
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
};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({
    // resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);