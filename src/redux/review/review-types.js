const ReviewActionTypes = {
    CREATE_REVIEW_START: 'CREATE_REVIEW_START',
    CREATE_REVIEW_SUCCESS: 'CREATE_REVIEW_SUCCESS',
    CREATE_REVIEW_FAILURE: 'CREATE_REVIEW_FAILURE',
    RESET_CREATE_REVIEW_STATUS: 'RESET_CREATE_REVIEW_STATUS',
    
    UPDATE_REVIEW_START: 'UPDATE_REVIEW_START',
    UPDATE_REVIEW_SUCCESS: 'UPDATE_REVIEW_SUCCESS',
    UPDATE_REVIEW_FAILURE: 'UPDATE_REVIEW_FAILURE',
    RESET_UPDATE_REVIEW_STATUS: 'RESET_UPDATE_REVIEW_STATUS',

    REQUEST_RESTAURANT_REVIEWS_START: 'REQUEST_RESTAURANT_REVIEWS_START',
    REQUEST_RESTAURANT_REVIEWS_SUCCESS: 'REQUEST_RESTAURANT_REVIEWS_SUCCESS',
    REQUEST_RESTAURANT_REVIEWS_FAILURE: 'REQUEST_RESTAURANT_REVIEWS_FAILURE',
    SET_REVIEW_SORTBY_FILTER: 'SET_REVIEW_SORTBY_FILTER',
    RESET_RESTAURANT_REVIEWS_STATUS: 'RESET_RESTAURANT_REVIEWS_STATUS'
};

export default ReviewActionTypes;