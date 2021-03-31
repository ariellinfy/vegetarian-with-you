import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { createRestaurantStart, updateRestaurantStart } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantToBeUpdate, selectRestaurantActionPending, selectRestaurantActionFailure, selectCreateRestaurantErr, selectUpdateRestaurantErr } from '../../redux/restaurant/restaurant-selectors';

import { TextField, FormControl, FormLabel, RadioGroup, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Radio, Checkbox, Button, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { COUNTRY_REGION } from '../../components/country-region';
import MuiPhoneNumber  from 'material-ui-phone-number';
import './restaurant-form-style.scss';

class RestaurantForm extends Component {
    constructor (props) {
        super(props);
        if (Object.keys(this.props.restaurantToBeUpdate).length === 0) {
            this.state = {
                restaurantName: '',
                restaurantAddress: '',
                restaurantCity: '',
                restaurantRegion: '',
                restaurantCountry: 'Canada',
                restaurantPostalCode: '',
                restaurantPhone: '',
                restaurantWebsite: '',
                restaurantType: '',
                restaurantCuisine: '',
                breakfast: false,
                brunch: false,
                lunch: false,
                dinner: false,
                restaurantWifi: '',
                restaurantTakeaway: '',
                restaurantDelivery: '',
                restaurantPungent: ''
            };
        } else {
            this.state = {
                restaurantName: this.props.restaurantToBeUpdate.restaurant_name,
                restaurantAddress: this.props.restaurantToBeUpdate.address,
                restaurantCity: this.props.restaurantToBeUpdate.city,
                restaurantRegion: this.props.restaurantToBeUpdate.region,
                restaurantCountry: this.props.restaurantToBeUpdate.country,
                restaurantPostalCode: this.props.restaurantToBeUpdate.postal_code,
                restaurantPhone: this.props.restaurantToBeUpdate.phone,
                restaurantWebsite: this.props.restaurantToBeUpdate.website,
                restaurantType: this.props.restaurantToBeUpdate.type,
                restaurantCuisine: this.props.restaurantToBeUpdate.cuisine,
                breakfast: this.props.restaurantToBeUpdate.breakfast,
                brunch: this.props.restaurantToBeUpdate.brunch,
                lunch: this.props.restaurantToBeUpdate.lunch,
                dinner: this.props.restaurantToBeUpdate.dinner,
                restaurantWifi: this.props.restaurantToBeUpdate.free_wifi,
                restaurantTakeaway: this.props.restaurantToBeUpdate.takeaway,
                restaurantDelivery: this.props.restaurantToBeUpdate.delivery,
                restaurantPungent: this.props.restaurantToBeUpdate.exclude_pungent
            };
        };
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { currentUserToken, restaurantToBeUpdate, createRestaurantStart, updateRestaurantStart } = this.props;
        const { 
            restaurantName, 
            restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
            restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
            breakfast, brunch, lunch, dinner,
            restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent 
        } = this.state;

        if (Object.keys(restaurantToBeUpdate).length === 0) {
            createRestaurantStart({
                restaurantName, 
                restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
                restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
                breakfast, brunch, lunch, dinner,
                restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent,
                currentUserToken
            });
        } else {
            updateRestaurantStart({
                restaurantName, 
                restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
                restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
                breakfast, brunch, lunch, dinner,
                restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent,
                currentUserToken
            });
        }
    };
    
    handleChange = event => {
        const { name, value, checked } = event.target;
        console.log(name, value, checked)
        if (name === 'breakfast' || name === 'brunch' || name === 'lunch' || name === 'dinner') {
            this.setState({ ...this.state, [name]: checked });
        } else if (name === 'restaurantCountry') {
            this.setState({ ...this.state, restaurantRegion: '', restaurantCountry: value });
        } else {
            this.setState({ ...this.state, [name]: value });
        }
    };

    render() {
        const { restaurantToBeUpdate, history } = this.props;
        const { 
            restaurantName, 
            restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
            restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
            breakfast, brunch, lunch, dinner,
            restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent 
        } = this.state;
        const countryCode = COUNTRY_REGION.map((country) => country.countryShortCode.toLowerCase());

        return (
            <div className='restaurant-form-container'>
                <div className='page-title'>
                    <LocationOnIcon fontSize="large" className='page-icon'/>
                    <Typography variant="h3">Add a Place</Typography>
                </div>
                <form className='restaurant-form' onSubmit={this.handleSubmit}>
                    <TextField 
                        className='text-field restaurant-name' 
                        label='Restaurant Name' 
                        name='restaurantName' 
                        value={restaurantName} 
                        variant="standard" 
                        onChange={this.handleChange}
                        fullWidth required 
                    />
                    
                    <TextField 
                        className='text-field restaurant-address' 
                        label='Restaurant Address' 
                        name='restaurantAddress' 
                        value={restaurantAddress} 
                        variant="standard" 
                        onChange={this.handleChange}
                        fullWidth required 
                    />
    
                    <TextField 
                        className='text-field restaurant-city' 
                        label='City' 
                        name='restaurantCity' 
                        value={restaurantCity} 
                        variant="standard" 
                        onChange={this.handleChange}
                        fullWidth 
                        required={
                            restaurantCountry === 'Taiwan' ? false : true
                        }
                    />
    
                    <FormControl variant="standard" className='select-field restaurant-region' required>
                        <InputLabel htmlFor="restaurant-region">Region</InputLabel>
                        <Select
                        name='restaurantRegion'
                        id="restaurant-region"
                        value={restaurantRegion}
                        onChange={this.handleChange}
                        disabled={!restaurantCountry}
                        >
                        {restaurantCountry
                            ? COUNTRY_REGION
                                .find(({ countryName }) => countryName === restaurantCountry)
                                .regions.map((region) => (
                                <MenuItem value={region.name} key={region.shortCode}>
                                    {region.name}
                                </MenuItem>
                                ))
                            : []}
                        </Select>
                    </FormControl>
    
                    <FormControl variant="standard" className='select-field restaurant-country' required>
                        <InputLabel htmlFor="restaurant-country">Country</InputLabel>
                        <Select
                            name='restaurantCountry'
                            id='restaurant-country'
                            value={restaurantCountry}
                            onChange={this.handleChange}
                        >
                        {COUNTRY_REGION.map((country) => (
                            <MenuItem
                                value={country.countryName}
                                key={country.countryShortCode}
                            >
                            {country.countryName}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
    
                    <TextField 
                        className='text-field restaurant-postal-code' 
                        label={ restaurantCountry === 'United States' ? 'Zip Code' : 'Postal Code' } 
                        name='restaurantPostalCode' 
                        value={restaurantPostalCode} 
                        variant="standard" 
                        onChange={this.handleChange}
                        fullWidth
                    />
    
                    <MuiPhoneNumber 
                        className='text-field restaurant-phone'
                        name='restaurantPhone' 
                        label="Phone Number"
                        defaultCountry={'ca'}
                        onlyCountries={countryCode}
                        variant="standard"
                        onChange={value => this.setState({...this.state, restaurantPhone: value})}
                        value={restaurantPhone}
                        fullWidth disableAreaCodes
                        // className={touched.contactPhoneNumber && errors.contactPhoneNumber ? "has-error" : null}
                   />
    
                    <TextField 
                        className='text-field restaurant-website' 
                        type='url'
                        label='Website' 
                        name='restaurantWebsite' 
                        value={restaurantWebsite} 
                        variant="standard" 
                        onChange={this.handleChange}
                        fullWidth
                    />
    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Type</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantType" name="restaurantType" value={restaurantType} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="lacto" 
                                control={<Radio className='select-input' />} 
                                label="lacto" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="ovo" 
                                control={<Radio className='select-input' />} 
                                label="ovo" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="ovo-lacto" 
                                control={<Radio className='select-input' />} 
                                label="ovo-lacto" 
                            />
                            <FormControlLabel 
                                className='select-label'
                                value="vegan" 
                                control={<Radio className='select-input' />} 
                                label="vegan" 
                            />
                        </RadioGroup>
                    </FormControl>
    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Cuisine</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantCuisine" name="restaurantCuisine" value={restaurantCuisine} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="chinese" 
                                control={<Radio className='select-input' />} 
                                label="chinese" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="western" 
                                control={<Radio className='select-input' />} 
                                label="western" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="other" 
                                control={<Radio className='select-input' />} 
                                label="other" 
                            />
                        </RadioGroup>
                    </FormControl>
    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Meals</FormLabel>
                        <FormGroup className='radio-group' aria-label="restaurantMeals">
                            <FormControlLabel 
                                className='select-label' 
                                control={<Checkbox className='select-input' name="breakfast" checked={breakfast} onChange={this.handleChange} />} 
                                label="breakfast" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                control={<Checkbox className='select-input' name="brunch" checked={brunch} onChange={this.handleChange} />} 
                                label="brunch" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                control={<Checkbox className='select-input' name="lunch" checked={lunch} onChange={this.handleChange} />} 
                                label="lunch" 
                            />
                            <FormControlLabel 
                                className='select-label'
                                control={<Checkbox className='select-input' name="dinner" checked={dinner} onChange={this.handleChange} />} 
                                label="dinner" 
                            />
                        </FormGroup>
                    </FormControl>
    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Free Wifi?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantWifi" name="restaurantWifi" value={restaurantWifi} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="yes" 
                                control={<Radio className='select-input' />} 
                                label="yes" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="no" 
                                control={<Radio className='select-input' />} 
                                label="no" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="not sure" 
                                control={<Radio className='select-input' />} 
                                label="not sure" 
                            />
                        </RadioGroup>
                    </FormControl>
                    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Takeaway?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantTakeaway" name="restaurantTakeaway" value={restaurantTakeaway} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="yes" 
                                control={<Radio className='select-input' />} 
                                label="yes" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="no" 
                                control={<Radio className='select-input' />} 
                                label="no" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="not sure" 
                                control={<Radio className='select-input' />} 
                                label="not sure" 
                            />
                        </RadioGroup>
                    </FormControl>
                    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Delivery?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantDelivery" name="restaurantDelivery" value={restaurantDelivery} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="yes" 
                                control={<Radio className='select-input' />} 
                                label="yes" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="no" 
                                control={<Radio className='select-input' />} 
                                label="no" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="not sure" 
                                control={<Radio className='select-input' />} 
                                label="not sure" 
                            />
                        </RadioGroup>
                    </FormControl>
                    
                    <FormControl className='selection-group' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Exclude 5 pungent vegetables?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="restaurantPungent" name="restaurantPungent" value={restaurantPungent} onChange={this.handleChange}>
                            <FormControlLabel 
                                className='select-label' 
                                value="yes" 
                                control={<Radio className='select-input' />} 
                                label="yes" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="no" 
                                control={<Radio className='select-input' />} 
                                label="no" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="not sure" 
                                control={<Radio className='select-input' />} 
                                label="not sure" 
                            />
                        </RadioGroup>
                    </FormControl>
    
                    <div className='buttons-group'>
                        <Button type='button' onClick={() => history.goBack()} className='button-input' variant="contained" color="primary">Back</Button>
                        <Button type='submit' className='button-input' variant="contained" color="secondary">Submit</Button>
                    </div>
                    
                    
                </form>
            </div>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    restaurantToBeUpdate: selectRestaurantToBeUpdate,
    actionPending: selectRestaurantActionPending,
    actionFailure: selectRestaurantActionFailure,
    createErrMsg: selectCreateRestaurantErr,
    updateErrMsg: selectUpdateRestaurantErr
});

const mapDispatchToProps = dispatch => ({
    createRestaurantStart: restaurantInfo => dispatch(createRestaurantStart(restaurantInfo)),
    updateRestaurantStart: restaurantInfo => dispatch(updateRestaurantStart(restaurantInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantForm));