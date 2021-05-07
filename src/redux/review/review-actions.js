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
export const setReviewToBeUpdate = review => ({
    type: ReviewActionTypes.REVIEW_TO_BE_UPDATE,
    payload: review
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

export const resetUpdateReviewStatus = () => ({
    type: ReviewActionTypes.RESET_UPDATE_REVIEW_STATUS
});

// Request restaurant reviews
export const requestReviewsStart = data => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_START,
    payload: data
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
    type: ReviewActionTypes.RESET_RESTAURANT_REVIEWS_STATUS
});

// Request restaurant reviews (with auth)
export const requestReviewsAuthStart = data => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_START,
    payload: data
});

export const requestReviewsAuthSuccess = reviews => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_SUCCESS,
    payload: reviews
});

export const requestReviewsAuthFailure = error => ({
    type: ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_FAILURE,
    payload: error
});

// Request user reviews
export const requestUserReviewsStart = currentUserToken => ({
    type: ReviewActionTypes.REQUEST_USER_REVIEWS_START,
    payload: currentUserToken
});

export const requestUserReviewsSuccess = reviews => ({
    type: ReviewActionTypes.REQUEST_USER_REVIEWS_SUCCESS,
    payload: reviews
});

export const requestUserReviewsFailure = error => ({
    type: ReviewActionTypes.REQUEST_USER_REVIEWS_FAILURE,
    payload: error
});

export const resetRequestUserReviewsStatus = () => ({
    type: ReviewActionTypes.RESET_USER_REVIEWS_STATUS
});

// Update review helpful record
export const reviewHelpfulStart = data => ({
    type: ReviewActionTypes.REVIEW_HELPFUL_START,
    payload: data
});

export const reviewHelpfulSuccess = () => ({
    type: ReviewActionTypes.REVIEW_HELPFUL_SUCCESS,
});

export const reviewHelpfulFailure = error => ({
    type: ReviewActionTypes.REVIEW_HELPFUL_FAILURE,
    payload: error
});

// Report review
export const reportReviewStart = data => ({
    type: ReviewActionTypes.REPORT_REVIEW_START,
    payload: data
});

export const reportReviewSuccess = () => ({
    type: ReviewActionTypes.REPORT_REVIEW_SUCCESS,
});

export const reportReviewFailure = error => ({
    type: ReviewActionTypes.REPORT_REVIEW_FAILURE,
    payload: error
});

// Delete review
export const deleteReviewStart = data => ({
    type: ReviewActionTypes.DELETE_REVIEW_START,
    payload: data
});

export const deleteReviewSuccess = () => ({
    type: ReviewActionTypes.DELETE_REVIEW_SUCCESS,
});

export const deleteReviewFailure = error => ({
    type: ReviewActionTypes.DELETE_REVIEW_FAILURE,
    payload: error
});

export const resetDeleteReviewStatus = () => ({
    type: ReviewActionTypes.RESET_DELETE_REVIEW_STATUS
});

// Reset review message status
export const resetReviewStatusMessage = () => ({
    type: ReviewActionTypes.RESET_REVIEW_STATUS_MESSAGE
});