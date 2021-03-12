import React, { useState } from 'react';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Typography, Button, Checkbox } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import './create-review-page-style.scss';

const labels = {
    0.5: 'Terrible',
    1: 'Terrible+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Average',
    3: 'Average+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

const CreateReviewPage = () => {
    const today = new Date();
    const [rate, setRate] = useState({
        foodRate: 2.5,
        serviceRate: 2.5,
        valueRate: 2.5,
        atomsphereRate: 2.5
    });
    const { foodRate, serviceRate, valueRate, atomsphereRate } = rate;

    const [hover, setHover] = useState({
        foodHover: 2.5,
        serviceHover: 2.5,
        valueHover: 2.5,
        atomsphereHover: 2.5
    });
    const { foodHover, serviceHover, valueHover, atomsphereHover } = hover;

    const [review, setReview] = useState({
        reviewTitle: '',
        reviewBody: '',
        visitPeriod: today.getFullYear() + '-' + ((today.getMonth() + 1).length > 1 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))),
        visitType: '',
        price: '',
        recommendDish: '',
        disclosure: false
    });
    const { reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, disclosure } = review;

    const handleSubmit = async event => {
        event.preventDefault();

    }

    const handleChange = event => {
        const { name, value, checked } = event.target;
        if (name === 'foodRate' || name === 'serviceRate' || name === 'valueRate' || name === 'atomsphereRate') {
            setRate({ ...rate, [name]: Number(value) });
        } else if (name === 'disclosure') {
            setReview({ ...review, [name]: checked })
        } else {
            setReview({ ...review, [name]: value });
        }
    }

    return (
        <div className='create-review-page'>
            <form className='review-form' id='review-form' onSubmit={handleSubmit}>
                <FormControl className='selection-group' component="fieldset" required>
                    <FormLabel className='selection-label' component="legend">Rate your visit</FormLabel>
                    <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='rating-label' component="span">Food</Typography>
                        <Rating 
                            name="foodRate" 
                            value={foodRate} 
                            precision={0.5} 
                            onChange={handleChange} 
                            onChangeActive={(event, newHover) => setHover({ ...hover, foodHover: newHover })} 
                        />
                        {foodRate !== null && <Box className='rating-description' ml={2}>{labels[foodHover !== -1 ? foodHover : foodRate]}</Box>}
                    </Box>
                    <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='rating-label' component="span">Service</Typography>
                        <Rating 
                            name="serviceRate" 
                            value={serviceRate} 
                            precision={0.5} 
                            onChange={handleChange} 
                            onChangeActive={(event, newHover) => setHover({ ...hover, serviceHover: newHover })} 
                        />
                        {serviceRate !== null && <Box className='rating-description' ml={2}>{labels[serviceHover !== -1 ? serviceHover : serviceRate]}</Box>}
                    </Box>
                    <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='rating-label' component="span">Value</Typography>
                        <Rating 
                            name="valueRate" 
                            value={valueRate} 
                            precision={0.5} 
                            onChange={handleChange} 
                            onChangeActive={(event, newHover) => setHover({ ...hover, valueHover: newHover })} 
                        />
                        {valueRate !== null && <Box className='rating-description' ml={2}>{labels[valueHover !== -1 ? valueHover : valueRate]}</Box>}
                    </Box>
                    <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                        <Typography className='rating-label' component="span">Atomsphere</Typography>
                        <Rating 
                            name="atomsphereRate" 
                            value={atomsphereRate} 
                            precision={0.5} 
                            onChange={handleChange} 
                            onChangeActive={(event, newHover) => setHover({ ...hover, atomsphereHover: newHover })} 
                        />
                        {atomsphereRate !== null && <Box className='rating-description' ml={2}>{labels[atomsphereHover !== -1 ? atomsphereHover : atomsphereRate]}</Box>}
                    </Box>
                </FormControl>

                <TextField 
                    className='text-field review-title' 
                    label='Title of Your Review' 
                    name='reviewTitle' 
                    value={reviewTitle} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />

                <TextField 
                    className='text-field user-review' 
                    label='Your Review' 
                    name='reviewBody' 
                    value={reviewBody} 
                    placeholder='Share your experience with other people.'
                    onChange={handleChange}
                    rows={5} 
                    variant="outlined" 
                    multiline fullWidth required 
                    />
                
                <TextField 
                    className='text-field visit-period' 
                    type='month' 
                    label='When did you visit?' 
                    name='visitPeriod' 
                    value={visitPeriod} 
                    onChange={handleChange}
                    variant="outlined" 
                    fullWidth  required
                />
                
                <FormControl className='selection-group' component="fieldset" required>
                    <FormLabel className='selection-label' component="legend">What sort of visit was this?</FormLabel>
                    <RadioGroup className='radio-group' aria-label="visitType" name="visitType" value={visitType} onChange={handleChange}>
                        <FormControlLabel 
                            className='select-label' 
                            value="couples" 
                            control={<Radio className='select-input' />} 
                            label="Couples" 
                        />
                        <FormControlLabel 
                            className='select-label' 
                            value="family" 
                            control={<Radio className='select-input' />} 
                            label="Family" 
                        />
                        <FormControlLabel  
                            className='select-label' 
                            value="friends" 
                            control={<Radio className='select-input' />} 
                            label="Friends" 
                        />
                        <FormControlLabel 
                            className='select-label'
                            value="business" 
                            control={<Radio className='select-input' />} 
                            label="Business" 
                        />
                        <FormControlLabel 
                            className='select-label' 
                            value="solo"  
                            control={<Radio className='select-input' />} 
                            label="Solo" 
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl className='selection-group' component="fieldset" required>
                    <FormLabel className='selection-label' component="legend">How expensive is this restaurant?</FormLabel>
                    <RadioGroup className='radio-group' aria-label="price" name="price" value={price} onChange={handleChange}>
                        <FormControlLabel 
                            className='select-label' 
                            value="cheap eats" 
                            control={<Radio className='select-input' />} 
                            label="Cheap Eats" 
                        />
                        <FormControlLabel  
                            className='select-label' 
                            value="mid-range" 
                            control={<Radio className='select-input' />} 
                            label="Mid-range" 
                        />
                        <FormControlLabel 
                            className='select-label' 
                            value="fine dining" 
                            control={<Radio className='select-input' />} 
                            label="Fine Dining" 
                        />
                    </RadioGroup>
                </FormControl>
                
                <TextField 
                    className='text-field recommend-dish' 
                    label='What dish(es) do you recommend?' 
                    name='recommendDish' 
                    value={recommendDish} 
                    onChange={handleChange}
                    variant="outlined" 
                    fullWidth  
                />

                <FormControl className='selection-group' component="fieldset">
                    <FormLabel className='selection-label' component="legend">Do you have photo(s) to share?</FormLabel>
                    <input
                        accept="image/*"
                        id="upload-button"
                        multiple
                        type="file"
                        hidden
                    />
                    <label className='upload-container' htmlFor="upload-button">
                        <Button variant="contained" color="primary" component="span">
                        Upload
                        </Button>
                    </label>
                </FormControl>

                <div className='submit-review'>
                    <FormControl className='selection-group disclosure-container' component="fieldset" required>
                        <FormLabel className='selection-label' component="legend">Disclosure</FormLabel>
                        <FormControlLabel
                            className='disclosure'
                            control={<Checkbox className='disclosure-statement' checked={disclosure} onChange={handleChange} name="disclosure" />}
                            label="I certify that this review is based on my own experience and is my genuine opinion of this restaurant, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review."
                        />
                    </FormControl>

                    <div className='buttons-group'>
                        <Button type='button' className='button-input' variant="contained" color="primary">Back</Button>
                        <Button type='submit' className='button-input' variant="contained" color="secondary">Submit</Button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CreateReviewPage;