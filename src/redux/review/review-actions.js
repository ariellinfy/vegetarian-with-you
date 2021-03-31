import ReviewActionTypes from './review-types';

export const createReviewStart = reviewDetail => ({
    type: ReviewActionTypes.CREATE_REVIEW_START,
    payload: reviewDetail
});

export const createReviewSuccess = review => ({
    type: ReviewActionTypes.CREATE_REVIEW_SUCCESS,
    payload: review
});

export const createReviewFailure = error => ({
    type: ReviewActionTypes.CREATE_REVIEW_FAILURE,
    payload: error
});

export const updateReviewStart = reviewDetail => ({
    type: ReviewActionTypes.UPDATE_REVIEW_START,
    payload: reviewDetail
});

export const updateReviewSuccess = review => ({
    type: ReviewActionTypes.UPDATE_REVIEW_SUCCESS,
    payload: review
});

export const updateReviewFailure = error => ({
    type: ReviewActionTypes.UPDATE_REVIEW_FAILURE,
    payload: error
});

export const resetCreateReviewStatus = () => ({
    type: ReviewActionTypes.RESET_CREATE_REVIEW_STATUS
});

export const resetUpdateReviewStatus = () => ({
    type: ReviewActionTypes.RESET_UPDATE_REVIEW_STATUS
});