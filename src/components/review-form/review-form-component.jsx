import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { createReviewStart, updateReviewStart, createReviewFailure, updateReviewFailure } from '../../redux/review/review-actions';
import { selectReviewToBeUpdate, selectReviewActionPending, selectReviewActionFailure, selectCreateReviewErr, selectUpdateReviewErr } from '../../redux/review/review-selectors';

import AlertMessage from '../alert-message/alert-message-component';
import Uploader from '../uploading/uploading-component';
import RestaurantIntro from '../../components/restaurant-intro/restaurant-intro-component';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Typography, Button, Checkbox, Divider, GridList, GridListTile, IconButton } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import imageCompression from 'browser-image-compression';
import './review-form-style.scss';

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

class ReviewForm extends Component {
    constructor (props) {
        super(props);
        const today = new Date();

        if (Object.keys(this.props.reviewToBeUpdate).length === 0) {
            this.state = {
                reviewTitle: '',
                reviewBody: '',
                foodRate: 0,
                serviceRate: 0,
                valueRate: 0,
                atmosphereRate: 0,
                foodHover: 0,
                serviceHover: 0,
                valueHover: 0,
                atmosphereHover: 0,
                visitPeriod: today.getFullYear() + '-' + ((today.getMonth() + 1).length > 1 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))),
                visitType: '',
                price: 0,
                recommendDish: '',
                photos: [],
                disclosure: false
            };
        } else {
            this.state = {
                reviewTitle: this.props.reviewToBeUpdate.review_title,
                reviewBody: this.props.reviewToBeUpdate.review_body,
                foodRate: this.props.reviewToBeUpdate.food_rate,
                serviceRate: this.props.reviewToBeUpdate.service_rate,
                valueRate: this.props.reviewToBeUpdate.value_rate,
                atmosphereRate: this.props.reviewToBeUpdate.atmosphere_rate,
                foodHover: this.props.reviewToBeUpdate.food_rate,
                serviceHover: this.props.reviewToBeUpdate.service_rate,
                valueHover: this.props.reviewToBeUpdate.value_rate,
                atmosphereHover: this.props.reviewToBeUpdate.atmosphere_rate,
                visitPeriod: this.props.reviewToBeUpdate.visit_period,
                visitType: this.props.reviewToBeUpdate.type_of_visit,
                price: this.props.reviewToBeUpdate.price_range,
                recommendDish: this.props.reviewToBeUpdate.recommended_dishes,
                photos: this.props.reviewToBeUpdate.photos,
                disclosure: false
            };
        };
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { currentUserToken, reviewToBeUpdate, createReviewStart, updateReviewStart, targetRestaurant } = this.props;
        const { foodRate, serviceRate, valueRate, atmosphereRate, 
            reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos, disclosure
        } = this.state;
        const restaurantId = targetRestaurant.restaurant_id;

        if (Object.keys(reviewToBeUpdate).length === 0) {
            await createReviewStart({
                restaurantId,
                foodRate, serviceRate, valueRate, atmosphereRate, 
                reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
                disclosure, currentUserToken
            });
        } else {
            const reviewId = reviewToBeUpdate.review_id;
            await updateReviewStart({
                reviewId, restaurantId,
                foodRate, serviceRate, valueRate, atmosphereRate, 
                reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
                disclosure, currentUserToken
            });
        }
    };

    handleChange = event => {
        const { name, value, checked } = event.target;
        if (name === 'foodRate' || name === 'serviceRate' || name === 'valueRate' || name === 'atmosphereRate') {
            this.setState({ ...this.state, [name]: Number(value) });
        } else if (name === 'disclosure') {
            this.setState({ ...this.state, [name]: checked })
        } else {
            this.setState({ ...this.state, [name]: value });
        }
    };

    handleUploadPhotos = async event => {
        const { reviewToBeUpdate, createReviewFailure, updateReviewFailure } = this.props;
        let imageFiles = Object.values(event.target.files);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true
        };

        if (imageFiles.length) {
            imageFiles.forEach(img => {
                if (!img.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg)$/)) {
                    if (Object.keys(reviewToBeUpdate).length === 0) {
                        createReviewFailure('File type must be .jpg/jpeg or .png or .svg')
                    } else {
                        updateReviewFailure('File type must be .jpg/jpeg or .png or .svg')
                    }
                    return false;
                } else if (img.name.match(/\.(svg)$/)) {
                    this.setState({ ...this.state, photos: this.state.photos.concat([img]) });
                } else {
                    imageFiles.forEach(img => {
                        imageCompression(img, options).then(compressedImg => {
                            const file = new File([compressedImg], compressedImg.name, {
                                lastModified: compressedImg.lastModified,
                                type: compressedImg.type
                            });
                            this.setState({ ...this.state, photos: this.state.photos.concat([file]) });
                        });
                    });
                }
            })
        } else {
            if (Object.keys(reviewToBeUpdate).length === 0) {
                createReviewFailure('Please select an image.')
            } else {
                updateReviewFailure('Please select an image.')
            }
            return false;
        };
    };

    handleClearImg = i => {
        this.state.photos.splice(i, 1);
        this.setState({ ...this.state, photos: this.state.photos });
    };

    render() {
        const { reviewToBeUpdate, targetRestaurant, actionPending, actionFailure, createErrMsg, updateErrMsg, history } = this.props;
        const { foodRate, serviceRate, valueRate, atmosphereRate, 
            foodHover, serviceHover, valueHover, atmosphereHover, 
            reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos, disclosure
        } = this.state;

        return (
            <div className='review-form-container'>
                <form className='review-form' id='review-form' onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <RestaurantIntro targetRestaurant={targetRestaurant} />
                    <Divider />
                    <FormControl className='selection-group MuiInputLabel-animated rating-group' component="fieldset" required>
                        <FormLabel className='selection-label' component="div">Rate your visit</FormLabel>
                        <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='rating-label' component="span">Food</Typography>
                            <Rating 
                                name="foodRate" 
                                value={foodRate} 
                                precision={0.5} 
                                onChange={this.handleChange} 
                                onChangeActive={(event, newHover) => this.setState({ ...this.state, foodHover: newHover })} 
                                required
                            />
                            {foodRate !== null && <Box className='rating-description' ml={2}>{labels[foodHover !== -1 ? foodHover : foodRate]}</Box>}
                        </Box>
                        <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='rating-label' component="span">Service</Typography>
                            <Rating 
                                name="serviceRate" 
                                value={serviceRate} 
                                precision={0.5} 
                                onChange={this.handleChange} 
                                onChangeActive={(event, newHover) => this.setState({ ...this.state, serviceHover: newHover })} 
                                required
                            />
                            {serviceRate !== null && <Box className='rating-description' ml={2}>{labels[serviceHover !== -1 ? serviceHover : serviceRate]}</Box>}
                        </Box>
                        <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='rating-label' component="span">Value</Typography>
                            <Rating 
                                name="valueRate" 
                                value={valueRate} 
                                precision={0.5} 
                                onChange={this.handleChange} 
                                onChangeActive={(event, newHover) => this.setState({ ...this.state, valueHover: newHover })} 
                                required
                            />
                            {valueRate !== null && <Box className='rating-description' ml={2}>{labels[valueHover !== -1 ? valueHover : valueRate]}</Box>}
                        </Box>
                        <Box className='rating-box' component="fieldset" mb={3} borderColor="transparent">
                            <Typography className='rating-label' component="span">Atmosphere</Typography>
                            <Rating 
                                name="atmosphereRate" 
                                value={atmosphereRate} 
                                precision={0.5} 
                                onChange={this.handleChange} 
                                onChangeActive={(event, newHover) => this.setState({ ...this.state, atmosphereHover: newHover })} 
                                required
                            />
                            {atmosphereRate !== null && <Box className='rating-description' ml={2}>{labels[atmosphereHover !== -1 ? atmosphereHover : atmosphereRate]}</Box>}
                        </Box>
                    </FormControl>
    
                    <TextField 
                        className='text-field review-title' 
                        label='Title of Your Review' 
                        name='reviewTitle' 
                        value={reviewTitle} 
                        variant="outlined" 
                        onChange={this.handleChange}
                        fullWidth required 
                    />
    
                    <TextField 
                        className='text-field user-review' 
                        label='Your Review' 
                        name='reviewBody' 
                        value={reviewBody} 
                        placeholder='Share your experience with other people.'
                        onChange={this.handleChange}
                        rows={6} 
                        variant="outlined" 
                        multiline fullWidth required 
                        />
                    
                    <TextField 
                        className='text-field visit-period' 
                        type='month' 
                        label='When did you visit?' 
                        name='visitPeriod' 
                        value={visitPeriod} 
                        onChange={this.handleChange}
                        variant="outlined" 
                        fullWidth required
                    />
                    
                    <FormControl className='selection-group' component="fieldset" required>
                        <FormLabel className='selection-label' component="legend">What sort of visit was this?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="visitType" name="visitType" value={visitType} onChange={this.handleChange} required>
                            <FormControlLabel 
                                className='select-label' 
                                value="couples" 
                                control={<Radio className='select-input' required/>} 
                                label="Couples" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="family" 
                                control={<Radio className='select-input' required/>} 
                                label="Family" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value="friends" 
                                control={<Radio className='select-input' required/>} 
                                label="Friends" 
                            />
                            <FormControlLabel 
                                className='select-label'
                                value="business" 
                                control={<Radio className='select-input' required/>} 
                                label="Business" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value="solo"  
                                control={<Radio className='select-input' required/>} 
                                label="Solo" 
                            />
                        </RadioGroup>
                    </FormControl>
    
                    <FormControl className='selection-group' component="fieldset" required>
                        <FormLabel className='selection-label' component="legend">How expensive is this restaurant?</FormLabel>
                        <RadioGroup className='radio-group' aria-label="price" name="price" value={`${price}`} onChange={this.handleChange} required>
                            <FormControlLabel 
                                className='select-label' 
                                value='1'
                                control={<Radio className='select-input' required/>} 
                                label="Cheap Eats" 
                            />
                            <FormControlLabel  
                                className='select-label' 
                                value='2'
                                control={<Radio className='select-input' required/>} 
                                label="Mid-range" 
                            />
                            <FormControlLabel 
                                className='select-label' 
                                value='3'
                                control={<Radio className='select-input' required/>} 
                                label="Fine Dining" 
                            />
                        </RadioGroup>
                    </FormControl>
                    
                    <TextField 
                        className='text-field recommend-dish' 
                        label='What dish(es) do you recommend?' 
                        name='recommendDish' 
                        value={recommendDish || ''} 
                        onChange={this.handleChange}
                        variant="outlined" 
                        fullWidth  
                    />
    
                    <FormControl className='selection-group upload-photo-container' component="fieldset">
                        <FormLabel className='selection-label' component="legend">Do you have photo(s) to share?</FormLabel>
                        <input
                            accept="image/*"
                            id="upload-button"
                            name='photos'
                            type="file"
                            style={{display:"none"}}
                            multiple
                            onChange={this.handleUploadPhotos}
                        />
                        <label className='upload-photos' htmlFor="upload-button">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        {
                            photos.length ? (
                                <div className='photo-preview-container'>
                                    {
                                        <GridList className='image-list' cols={4} cellHeight='auto'>
                                            {photos.map((photo, i) => {
                                                return (
                                                <GridListTile className='image-box' key={photo.path ? photo.filename : photo.lastModified + '-' + photo.name}>
                                                    <IconButton className='clear-btn' aria-label="delete" onClick={this.handleClearImg.bind(this, i)}>
                                                        <ClearRoundedIcon fontSize="small" />
                                                    </IconButton>
                                                    <img className='preview' src={photo.path ? `http://localhost:5000/${photo.path}` : URL.createObjectURL(photo)} alt={photo.name} />
                                                </GridListTile>
                                            )})}
                                        </GridList>
                                    }
                                </div>
                            ) : null
                        }
                    </FormControl>
    
                    <div className='submit-review'>
                        <FormControl className='selection-group disclosure-container' component="fieldset" required>
                            <FormLabel className='selection-label' component="legend">Disclosure</FormLabel>
                            <FormControlLabel
                                className='disclosure'
                                control={<Checkbox className='disclosure-statement' checked={disclosure} onChange={this.handleChange} name="disclosure" required />}
                                label="I certify that this review is based on my own experience and is my genuine opinion of this restaurant, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review."
                            />
                        </FormControl>
                        {
                            actionFailure ? (Object.keys(reviewToBeUpdate).length === 0 ? <AlertMessage severity='error' errMsg={createErrMsg} /> : <AlertMessage severity='error' errMsg={updateErrMsg} />) : null
                        }
                        <div className='buttons-group'>
                            <Button type='button' onClick={() => history.goBack()} className='button-input' variant="contained" color="primary">Back</Button>
                            <Button type='submit' className='button-input' variant="contained" color="secondary" disabled={ disclosure ? false : true }>Submit</Button>
                        </div>
                    </div>
                    {
                        actionPending ? <Uploader /> : null
                    }
                </form>
            </div>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    reviewToBeUpdate: selectReviewToBeUpdate,
    actionPending: selectReviewActionPending,
    actionFailure: selectReviewActionFailure,
    createErrMsg: selectCreateReviewErr,
    updateErrMsg: selectUpdateReviewErr
});

const mapDispatchToProps = dispatch => ({
    createReviewStart: reviewDetail => dispatch(createReviewStart(reviewDetail)),
    updateReviewStart: reviewDetail => dispatch(updateReviewStart(reviewDetail)),
    createReviewFailure: error => dispatch(createReviewFailure(error)),
    updateReviewFailure: error => dispatch(updateReviewFailure(error)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm));