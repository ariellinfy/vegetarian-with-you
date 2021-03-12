import React, { useState } from 'react';
import { TextField, FormControl, FormLabel, RadioGroup, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Radio, Checkbox, Button } from '@material-ui/core';
import { COUNTRY_REGION } from '../../components/country-region';
import MuiPhoneNumber  from 'material-ui-phone-number';
import './create-restaurant-page-style.scss';

const CreateRestaurantPage = () => {
    const [restaurant, setRestaurant] = useState({
        restaurantName: '',
        restaurantAddress: '',
        restaurantCity: '',
        restaurantRegion: '',
        restaurantCountry: 'Canada',
        restaurantPostalCode: '',
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
    });

    const { restaurantName, 
        restaurantAddress, 
        restaurantCity, 
        restaurantRegion, 
        restaurantCountry, 
        restaurantPostalCode, 
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

    const countryCode = COUNTRY_REGION.map((country) => country.countryShortCode.toLowerCase());
    const [restaurantPhone, setRestaurantPhone] = useState('');
    
    const handleSubmit = async event => {
        event.preventDefault();

    }
    
    const handleChange = event => {
        const { name, value, checked } = event.target;
        if (name === 'breakfast' || name === 'brunch' || name === 'lunch' || name === 'dinner') {
            setRestaurant({ ...restaurant, [name]: checked });
        } else if (name === 'restaurantCountry') {
            setRestaurant({ ...restaurant, restaurantRegion: '', restaurantCountry: value });
        }
        else {
            setRestaurant({ ...restaurant, [name]: value });
        }
    }

    return (
        <div className='create-restaurant-page'>
            <form className='restaurant-form' onSubmit={handleSubmit}>
                <TextField 
                    className='text-field restaurant-name' 
                    label='Restaurant Name' 
                    name='restaurantName' 
                    value={restaurantName} 
                    variant="filled" 
                    onChange={handleChange}
                    fullWidth required 
                />
                
                <TextField 
                    className='text-field restaurant-address' 
                    label='Restaurant Address' 
                    name='restaurantAddress' 
                    value={restaurantAddress} 
                    variant="filled" 
                    onChange={handleChange}
                    fullWidth required 
                />

                <TextField 
                    className='text-field restaurant-city' 
                    label='City' 
                    name='restaurantCity' 
                    value={restaurantCity} 
                    variant="filled" 
                    onChange={handleChange}
                    fullWidth 
                    required={
                        restaurantCountry === 'Taiwan' ? false : true
                    }
                />

                <FormControl variant="filled" className='select-field restaurant-region' required>
                    <InputLabel htmlFor="restaurant-region">Region</InputLabel>
                    <Select
                    name='restaurantRegion'
                    id="restaurant-region"
                    value={restaurantRegion}
                    onChange={handleChange}
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

                <FormControl variant="filled" className='select-field restaurant-country' required>
                    <InputLabel htmlFor="restaurant-country">Country</InputLabel>
                    <Select
                        name='restaurantCountry'
                        id='restaurant-country'
                        value={restaurantCountry}
                        onChange={handleChange}
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
                    variant="filled" 
                    onChange={handleChange}
                    fullWidth
                />

                <MuiPhoneNumber 
                    className='text-field restaurant-phone'
                    name='restaurantPhone' 
                    label="Phone Number"
                    defaultCountry={'ca'}
                    onlyCountries={countryCode}
                    variant="filled"
                    onChange={value => setRestaurantPhone(value)}
                    value={restaurantPhone}
                    fullWidth required disableAreaCodes
                    // className={touched.contactPhoneNumber && errors.contactPhoneNumber ? "has-error" : null}
               />

                <TextField 
                    className='text-field restaurant-website' 
                    type='url'
                    label='Website' 
                    name='restaurantWebsite' 
                    value={restaurantWebsite} 
                    variant="filled" 
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl className='selection-group' component="fieldset">
                    <FormLabel className='selection-label' component="legend">Type</FormLabel>
                    <RadioGroup className='radio-group' aria-label="restaurantType" name="restaurantType" value={restaurantType} onChange={handleChange}>
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
                    <RadioGroup className='radio-group' aria-label="restaurantCuisine" name="restaurantCuisine" value={restaurantCuisine} onChange={handleChange}>
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
                            control={<Checkbox className='select-input' name="breakfast" checked={breakfast} onChange={handleChange} />} 
                            label="breakfast" 
                        />
                        <FormControlLabel 
                            className='select-label' 
                            control={<Checkbox className='select-input' name="brunch" checked={brunch} onChange={handleChange} />} 
                            label="brunch" 
                        />
                        <FormControlLabel  
                            className='select-label' 
                            control={<Checkbox className='select-input' name="lunch" checked={lunch} onChange={handleChange} />} 
                            label="lunch" 
                        />
                        <FormControlLabel 
                            className='select-label'
                            control={<Checkbox className='select-input' name="dinner" checked={dinner} onChange={handleChange} />} 
                            label="dinner" 
                        />
                    </FormGroup>
                </FormControl>

                <FormControl className='selection-group' component="fieldset">
                    <FormLabel className='selection-label' component="legend">Free Wifi?</FormLabel>
                    <RadioGroup className='radio-group' aria-label="restaurantWifi" name="restaurantWifi" value={restaurantWifi} onChange={handleChange}>
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
                    <RadioGroup className='radio-group' aria-label="restaurantTakeaway" name="restaurantTakeaway" value={restaurantTakeaway} onChange={handleChange}>
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
                    <RadioGroup className='radio-group' aria-label="restaurantDelivery" name="restaurantDelivery" value={restaurantDelivery} onChange={handleChange}>
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
                    <RadioGroup className='radio-group' aria-label="restaurantPungent" name="restaurantPungent" value={restaurantPungent} onChange={handleChange}>
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
                    <Button type='button' className='button-input' variant="contained" color="primary">Back</Button>
                    <Button type='submit' className='button-input' variant="contained" color="secondary">Submit</Button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateRestaurantPage;