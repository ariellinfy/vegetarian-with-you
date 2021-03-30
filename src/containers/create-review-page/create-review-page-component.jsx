import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { selectReviewActionPending, selectReviewActionSuccess, selectCreateReviewErr } from '../../redux/restaurant/restaurant-selectors';

import { ReviewForm } from '../../components/review-form/review-form-component';
import './create-review-page-style.scss';

const CreateReviewPage = ({ actionPending, actionSuccess, createReviewErr, history }) => {
    return (
        <div className='create-review-page'>
            {
                actionSuccess ? (
                    <div></div>
                ) : (
                    <ReviewForm />
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    actionPending: selectReviewActionPending,
    actionSuccess: selectReviewActionSuccess,
    createReviewErr: selectCreateReviewErr,
});

export default withRouter(connect(mapStateToProps, null)(CreateReviewPage));