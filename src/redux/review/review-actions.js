import ReviewActionTypes from './review-types';

// Create review

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

export const resetCreateReviewStatus = () => ({
    type: ReviewActionTypes.RESET_CREATE_REVIEW_STATUS
});

// Update review

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

export const resetUpdateReviewStatus = () => ({
    type: ReviewActionTypes.RESET_UPDATE_REVIEW_STATUS
});

// Request reviews

export const requestReviewsStart = info => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_START,
    payload: info
});

export const requestReviewsSuccess = reviews => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_SUCCESS,
    payload: reviews
});

export const requestReviewsFailure = error => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_FAILURE,
    payload: error
});

export const setReviewSortbyFilter = filter => ({
    type: ReviewActionTypes.SET_REVIEW_SORTBY_FILTER,
    payload: filter
});

export const resetRequestReviewsStatus = () => ({
    type: ReviewActionTypes.RESET_REQUEST_RESTAURANT_REVIEWS_STATUS
});