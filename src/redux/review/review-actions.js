import ReviewActionTypes from './review-types';

export const createReviewStart = reviewInfo => ({
    type: ReviewActionTypes.CREATE_REVIEW_START,
    payload: reviewInfo
});

export const createReviewSuccess = review => ({
    type: ReviewActionTypes.CREATE_REVIEW_SUCCESS,
    payload: review
});

export const createReviewFailure = error => ({
    type: ReviewActionTypes.CREATE_REVIEW_FAILURE,
    payload: error
});

export const updateReviewStart = reviewInfo => ({
    type: ReviewActionTypes.UPDATE_REVIEW_START,
    payload: reviewInfo
});

export const updateReviewSuccess = review => ({
    type: ReviewActionTypes.UPDATE_REVIEW_SUCCESS,
    payload: review
});

export const updateReviewFailure = error => ({
    type: ReviewActionTypes.UPDATE_REVIEW_FAILURE,
    payload: error
});