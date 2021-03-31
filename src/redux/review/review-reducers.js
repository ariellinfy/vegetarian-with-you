import ReviewActionTypes from './review-types';

const INITIAL_STATE = {
    targetReview: {},
    reviewToBeUpdate: {},
    reviewActionPending: false,
    reviewCreateSuccess: false,
    reviewUpdateSuccess: false,
    reviewActionFailure: false,
    createReviewErr: '',
    updateReviewErr: '',
}

const reviewReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ReviewActionTypes.CREATE_REVIEW_START:
            return {
                ...state,
                targetReview: {},
                reviewActionPending: true,
                reviewCreateSuccess: false,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.UPDATE_REVIEW_START:
            return {
                ...state,
                reviewToBeUpdate: action.payload,
                reviewActionPending: true,
                reviewUpdateSuccess: false,
                reviewActionFailure: false,
                updateReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                targetReview: action.payload,
                reviewActionPending: false,
                reviewCreateSuccess: true,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                targetReview: action.payload,
                reviewActionPending: false,
                reviewUpdateSuccess: true,
                reviewActionFailure: false,
                updateReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_FAILURE:
            return {
                ...state,
                createReviewErr: action.payload,
                reviewActionPending: false,
                reviewCreateSuccess: false,
                reviewActionFailure: true,
            };
        case ReviewActionTypes.UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                updateReviewErr: action.payload,
                reviewActionPending: false,
                reviewUpdateSuccess: false,
                reviewActionFailure: true,
            };
        case ReviewActionTypes.RESET_CREATE_REVIEW_STATUS:
            return {
                ...state,
                targetReview: {},
                reviewActionPending: false,
                reviewCreateSuccess: false,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.RESET_UPDATE_REVIEW_STATUS:
            return {
                ...state,
                targetReview: {},
                reviewToBeUpdate: {},
                reviewActionPending: false,
                reviewUpdateSuccess: false,
                reviewActionFailure: false,
                updateReviewErr: '',
            };
        default:
            return state;
    }
}

export default reviewReducer;