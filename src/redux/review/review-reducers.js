import ReviewActionTypes from './review-types';

const INITIAL_STATE = {
    targetReview: {},
    reviewActionPending: false,
    reviewActionSuccess: false,
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
                reviewActionSuccess: false,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.UPDATE_REVIEW_START:
            return {
                ...state,
                targetReview: {},
                reviewActionPending: true,
                reviewActionSuccess: false,
                reviewActionFailure: false,
                updateReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                targetReview: action.payload,
                reviewActionPending: false,
                reviewActionSuccess: true,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                targetReview: action.payload,
                reviewActionPending: false,
                reviewActionSuccess: true,
                reviewActionFailure: false,
                updateReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_FAILURE:
            return {
                ...state,
                createReviewErr: action.payload,
                reviewActionPending: false,
                reviewActionSuccess: false,
                reviewActionFailure: true,
            };
        case ReviewActionTypes.UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                updateReviewErr: action.payload,
                reviewActionPending: false,
                reviewActionSuccess: false,
                reviewActionFailure: true,
            };
        case ReviewActionTypes.RESET_REVIEW_STATUS:
            return {
                ...state,
                targetReview: {},
                reviewActionPending: false,
                reviewActionSuccess: false,
                reviewActionFailure: false,
                createReviewErr: '',
                updateReviewErr: '',
            };
        default:
            return state;
    }
}

export default reviewReducer;