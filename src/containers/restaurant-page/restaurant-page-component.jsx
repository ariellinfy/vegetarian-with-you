import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Divider, Paper, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faQuestion, faMapMarkedAlt, faPhoneAlt, faExternalLinkAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReviewPreview from '../../components/review-preview/review-preview-component';
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

const MenuItem = ({url, selected}) => (
    <div className={`menu-item ${selected ? 'active' : ''}`}>
        <img
          style={{ height: "200px" }}
          alt="test"
          src={url}
        />
    </div>
);

export const Menu = (list, selected) =>
    list.map(el => {
      const { original } = el;
      return <MenuItem url={original} key={original} selected={selected} />;
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

    const checkIcon = <FontAwesomeIcon icon={faCheck} color='green' />
    const crossIcon = <FontAwesomeIcon icon={faTimes} color='red' />
    const questionIcon = <FontAwesomeIcon icon={faQuestion} color='grey' />
    const mapIcon = <FontAwesomeIcon icon={faMapMarkedAlt} color='orange' />
    const phoneIcon = <FontAwesomeIcon icon={faPhoneAlt} color='blue' />
    const websiteIcon = <FontAwesomeIcon icon={faExternalLinkAlt} color='black' />
    const rightIcon = <FontAwesomeIcon icon={faChevronRight} className='arrow-prev' />
    const leftIcon = <FontAwesomeIcon icon={faChevronLeft} className='arrow-prev' />

    const [selected, setSelected] = useState('item1');

    const menu = Menu(list, selected);

    return (
        <div className='restaurant-page'>
            <div className='restaurant-basic'>
                <h3 className='restaurant-name'>{restaurantName}</h3>
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
            
            <div className='restaurant-photos'>
                <ScrollMenu
                    data={menu}
                    arrowLeft={leftIcon}
                    arrowRight={rightIcon}
                    selected={selected}
                    onSelect={key => setSelected({ selected: key })}
                />

                {/* <ImageGallery items={images} /> */}
            </div>

            <div className='restaurant-advance'>
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
                                breakfast === true ? [checkIcon] : [crossIcon] 
                            }
                            <Typography className='item meal' component="span">Breakfast</Typography>
                        </Box>
                        <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                brunch === true ? [checkIcon] : [crossIcon] 
                            }
                            <Typography className='item meal' component="span">Brunch</Typography>
                        </Box>
                        <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                lunch === true ? [checkIcon] : [crossIcon]  
                            }
                            <Typography className='item meal' component="span">Lunch</Typography>
                        </Box>
                        <Box className='item-container meal-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                dinner === true ? [checkIcon] : [crossIcon] 
                            }
                            <Typography className='item meal' component="span">Dinner</Typography>
                        </Box>
                    </div>
                </Paper>
                <Paper id='contact' className='advance-container'>
                    <Typography className='paper-title' component="legend">Location and Contact</Typography>
                    <div className='paper-container contacts'>
                        <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                            {mapIcon}
                            <Typography className='item contact' component="span">{`${restaurantAddress}, ${restaurantCity}, ${restaurantRegion} ${restaurantPostalCode} ${restaurantCountry}`}</Typography>
                        </Box>
                        <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                            {phoneIcon}
                            <Typography className='item contact' component="span">{restaurantPhone}</Typography>
                        </Box>
                        <Box className='item-container contact-container' component="fieldset" mb={3} borderColor="transparent">
                            {websiteIcon}
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
                                restaurantWifi === 'yes' ? [checkIcon] : (restaurantWifi === 'no' ? [crossIcon] : [questionIcon]) 
                            }
                            <Typography className='item feature' component="span">Free Wifi</Typography>
                        </Box>
                        <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                restaurantTakeaway === 'yes' ? [checkIcon] : (restaurantTakeaway === 'no' ? [crossIcon] : [questionIcon]) 
                            }
                            <Typography className='item feature' component="span">Takeaway</Typography>
                        </Box>
                        <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                restaurantDelivery === 'yes' ? [checkIcon] : (restaurantDelivery === 'no' ? [crossIcon] : [questionIcon]) 
                            }
                            <Typography className='item feature' component="span">Delivery</Typography>
                        </Box>
                        <Box className='item-container feature-container' component="fieldset" mb={3} borderColor="transparent">
                            {
                                restaurantPungent === 'yes' ? [checkIcon] : (restaurantPungent === 'no' ? [crossIcon] : [questionIcon]) 
                            }
                            <Typography className='item feature' component="span">Exclude 5 pungent vegetables</Typography>
                        </Box>
                    </div>
                </Paper>
            </div>
            
            <div className='customer-reviews'>
                <div className='review-header'>
                    <h4>Reviews ({reviewCount})</h4>
                    {/* sort by button */}
                    {/* write a review button */}
                </div>
                {
                    // review data to map
                }
                <ReviewPreview />
            </div>
        </div>
    )
}

export default RestaurantPage;