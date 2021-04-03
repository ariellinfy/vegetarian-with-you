import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";
import { resetUpdateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { selectRestaurantUpdateSuccess, selectTargetRestaurantInfo, selectTargetRestaurantInfoToMap } from '../../redux/restaurant/restaurant-selectors';

import RestaurantForm from '../../components/restaurant-form/restaurant-form-component';
import { Typography, Card, Button } from '@material-ui/core';
import './update-restaurant-page-style.scss';

const UpdateRestaurantPage = ({ updateSuccess, targetRestaurant, targetRestaurantToMap, resetUpdateRestaurantStatus }) => {
    const currentUserToken = localStorage.getItem('token');

    return (
        <div className='update-restaurant-page'>
            {
                updateSuccess ? (
                    <div className="restaurant-success">
                        <div className="restaurant-header">
                            <Typography variant="h5">
                                You've successfully updated 
                                <span className="restaurant-name">
                                    {targetRestaurant.restaurant_name}
                                </span>
                                 restaurant profile!
                            </Typography>
                        </div>
                        <Card className="restaurant-body" elevation={0}>

                                {
                                    targetRestaurantToMap ? (
                                        targetRestaurantToMap.filter((item, index) => index > 0 && index < targetRestaurantToMap.length - 5)
                                        .map(item => (
                                        <Typography id={item[0]} className="restaurant-detail" color="textSecondary" gutterBottom>
                                            {item[0].toUpperCase()}: {item[1]}
                                        </Typography>
                                    ))) : null
                                }

                        </Card>
                        <div className="restaurant-actions">
                            <Typography variant="h5">
                                What's next?
                            </Typography>
                            <Button component={Link} to={'/explore'} variant="outlined" color="primary" className="btn-next" onClick={() => resetUpdateRestaurantStatus()}>Explore more restaurants</Button>
                            <Button component={Link} to={'/createreview'} variant="contained" color="primary" className="btn-next" onClick={() => resetUpdateRestaurantStatus()}>Continue to write a new reivew</Button>
                        </div>

                    </div>
                ) : (
                    <RestaurantForm currentUserToken={currentUserToken} />
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    updateSuccess: selectRestaurantUpdateSuccess,
    targetRestaurant: selectTargetRestaurantInfo,
    targetRestaurantToMap: selectTargetRestaurantInfoToMap
});

const mapDispatchToProps = dispatch => ({
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRestaurantPage);