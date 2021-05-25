import ReviewActionTypes from './review-types';

const INITIAL_STATE = {
    targetReview: {},
    reviewToBeUpdate: {},
    reviewActionPending: false,
    reviewCreateSuccess: false,
    reviewUpdateSuccess: false,
    reviewDeleteSuccess: false,
    reviewActionFailure: false,
    createReviewErr: '',
    updateReviewErr: '',
    reviewsCollection: [],
    userReviews: [],
    reviewRequestPending: false,
    reviewRequestSuccess: false,
    requestReviewErr: '',
    reviewSortbyFilter: 'Sort By',
    reviewSuccessMessage: '',
    reviewErrorMessage: '',
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
        case ReviewActionTypes.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                targetReview: action.payload,
                reviewActionPending: false,
                reviewCreateSuccess: true,
                reviewActionFailure: false,
                createReviewErr: '',
            };
        case ReviewActionTypes.CREATE_REVIEW_FAILURE:
            return {
                ...state,
                createReviewErr: action.payload,
                reviewActionPending: false,
                reviewCreateSuccess: false,
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

        case ReviewActionTypes.REVIEW_TO_BE_UPDATE:
            return {
                ...state,
                reviewToBeUpdate: action.payload,
                reviewActionPending: false,
                reviewUpdateSuccess: false,
                reviewActionFailure: false,
            };
        case ReviewActionTypes.UPDATE_REVIEW_START:
            return {
                ...state,
                reviewActionPending: true,
                reviewUpdateSuccess: false,
                reviewActionFailure: false,
                updateReviewErr: '',
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
        case ReviewActionTypes.UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                updateReviewErr: action.payload,
                reviewActionPending: false,
                reviewUpdateSuccess: false,
                reviewActionFailure: true,
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

        case ReviewActionTypes.DELETE_PHOTO_FAILURE:
            return {
                ...state,
                createReviewErr: action.payload,
                updateReviewErr: action.payload,
                reviewActionFailure: true,
            };

        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_START:
        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_START:
        case ReviewActionTypes.REQUEST_USER_REVIEWS_START:
            return {
                ...state,
                reviewRequestPending: true,
                reviewRequestSuccess: false,
            };
        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_SUCCESS:
        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_SUCCESS:
            return {
                ...state,
                reviewsCollection: action.payload,
                reviewRequestPending: false,
                reviewRequestSuccess: true,
                requestReviewErr: '',
            };
        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_FAILURE:
        case ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_FAILURE:
        case ReviewActionTypes.REQUEST_USER_REVIEWS_FAILURE:
            return {
                ...state,
                reviewRequestPending: false,
                reviewRequestSuccess: false,
                requestReviewErr: action.payload,
            };
        case ReviewActionTypes.SET_REVIEW_SORTBY_FILTER:
            return {
                ...state,
                reviewSortbyFilter: action.payload,
            };
        case ReviewActionTypes.RESET_RESTAURANT_REVIEWS_STATUS:
            return {
                ...state,
                reviewsCollection: [],
                reviewRequestPending: false,
                reviewRequestSuccess: false,
                requestReviewErr: '',
                reviewSortbyFilter: 'Sort By',
            };

        case ReviewActionTypes.REQUEST_USER_REVIEWS_SUCCESS:
            return {
                ...state,
                userReviews: action.payload,
                reviewRequestPending: false,
                reviewRequestSuccess: true,
                requestReviewErr: '',
            };
        case ReviewActionTypes.RESET_USER_REVIEWS_STATUS:
            return {
                ...state,
                userReviews: [],
                reviewRequestPending: false,
                reviewRequestSuccess: false,
                requestReviewErr: '',
            };

        case ReviewActionTypes.REVIEW_HELPFUL_START:
        case ReviewActionTypes.REPORT_REVIEW_START:
            return {
                ...state,
                reviewActionPending: true,
                reviewUpdateSuccess: false,
                reviewActionFailure: false,
            };
        case ReviewActionTypes.REVIEW_HELPFUL_SUCCESS:
            return {
                ...state,
                reviewActionPending: false,
                reviewUpdateSuccess: true,
                reviewActionFailure: false,
            };
        case ReviewActionTypes.REPORT_REVIEW_SUCCESS:
            return {
                ...state,
                reviewActionPending: false,
                reviewUpdateSuccess: true,
                reviewActionFailure: false,
                reviewSuccessMessage: 'Report has been sent to our team for further review, thank you for your continued support!'
            };
        case ReviewActionTypes.REVIEW_HELPFUL_FAILURE:
        case ReviewActionTypes.REPORT_REVIEW_FAILURE:
            return {
                ...state,
                reviewErrorMessage: action.payload,
                reviewActionPending: false,
                reviewUpdateSuccess: false,
                reviewActionFailure: true,
            };

        case ReviewActionTypes.DELETE_REVIEW_START:
            return {
                ...state,
                reviewActionPending: true,
                reviewDeleteSuccess: false,
                reviewActionFailure: false,
            };
        case ReviewActionTypes.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                reviewActionPending: false,
                reviewDeleteSuccess: true,
                reviewActionFailure: false,
                reviewSuccessMessage: 'Successfully deleted review, thank you for all your contribution and support, looking forward to seeing you back!'
            };
        case ReviewActionTypes.DELETE_REVIEW_FAILURE:
            return {
                ...state,
                reviewActionPending: false,
                reviewDeleteSuccess: false,
                reviewActionFailure: true,
                reviewErrorMessage: action.payload,
            };
        case ReviewActionTypes.RESET_DELETE_REVIEW_STATUS:
            return {
                ...state,
                reviewActionPending: false,
                reviewDeleteSuccess: false,
                reviewActionFailure: false,
            };

        case ReviewActionTypes.RESET_REVIEW_STATUS_MESSAGE:
            return {
                ...state,
                reviewSuccessMessage: '',
                reviewErrorMessage: '',
            };

        default:
            return state;
    }
}

export default reviewReducer;