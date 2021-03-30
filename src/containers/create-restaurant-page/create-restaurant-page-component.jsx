import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { selectRestaurantActionPending, selectRestaurantActionSuccess, selectCreateRestaurantErr } from '../../redux/restaurant/restaurant-selectors';

import { RestaurantForm } from '../../components/restaurant-form/restaurant-form-component';
import './create-restaurant-page-style.scss';

const CreateRestaurantPage = ({ actionPending, actionSuccess, createRestaurantErr, history }) => {
    return (
        <div className='create-restaurant-page'>
            {
                actionSuccess ? (
                    <div></div>
                ) : (
                    <RestaurantForm />
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    actionPending: selectRestaurantActionPending,
    actionSuccess: selectRestaurantActionSuccess,
    createRestaurantErr: selectCreateRestaurantErr
});

export default withRouter(connect(mapStateToProps, null)(CreateRestaurantPage));