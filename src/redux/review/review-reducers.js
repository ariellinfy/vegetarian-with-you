import ReviewActionTypes from './review-types';

const INITIAL_STATE = {
    reviews: {},
    createReviewErr: '',
    updateReviewErr: '',
}

const reviewReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ReviewActionTypes.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: action.payload,
                createReviewErr: '',
            };
        case ReviewActionTypes.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: action.payload,
                updateReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_FAILURE:
            return {
                ...state,
                createReviewErr: action.payload
            };
        case ReviewActionTypes.UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                updateReviewErr: action.payload
            };
        default:
            return state;
    }
}

export default reviewReducer;