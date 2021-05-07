const ReviewActionTypes = {
    CREATE_REVIEW_START: 'CREATE_REVIEW_START',
    CREATE_REVIEW_SUCCESS: 'CREATE_REVIEW_SUCCESS',
    CREATE_REVIEW_FAILURE: 'CREATE_REVIEW_FAILURE',
    RESET_CREATE_REVIEW_STATUS: 'RESET_CREATE_REVIEW_STATUS',
    
    REVIEW_TO_BE_UPDATE: 'REVIEW_TO_BE_UPDATE',
    UPDATE_REVIEW_START: 'UPDATE_REVIEW_START',
    UPDATE_REVIEW_SUCCESS: 'UPDATE_REVIEW_SUCCESS',
    UPDATE_REVIEW_FAILURE: 'UPDATE_REVIEW_FAILURE',
    RESET_UPDATE_REVIEW_STATUS: 'RESET_UPDATE_REVIEW_STATUS',

    REQUEST_RESTAURANT_REVIEWS_START: 'REQUEST_RESTAURANT_REVIEWS_START',
    REQUEST_RESTAURANT_REVIEWS_SUCCESS: 'REQUEST_RESTAURANT_REVIEWS_SUCCESS',
    REQUEST_RESTAURANT_REVIEWS_FAILURE: 'REQUEST_RESTAURANT_REVIEWS_FAILURE',
    SET_REVIEW_SORTBY_FILTER: 'SET_REVIEW_SORTBY_FILTER',
    RESET_RESTAURANT_REVIEWS_STATUS: 'RESET_RESTAURANT_REVIEWS_STATUS',

    REQUEST_RESTAURANT_REVIEWS_AUTH_START: 'REQUEST_RESTAURANT_REVIEWS_AUTH_START',
    REQUEST_RESTAURANT_REVIEWS_AUTH_SUCCESS: 'REQUEST_RESTAURANT_REVIEWS_AUTH_SUCCESS',
    REQUEST_RESTAURANT_REVIEWS_AUTH_FAILURE: 'REQUEST_RESTAURANT_REVIEWS_AUTH_FAILURE',

    REQUEST_USER_REVIEWS_START: 'REQUEST_USER_REVIEWS_START',
    REQUEST_USER_REVIEWS_SUCCESS: 'REQUEST_USER_REVIEWS_SUCCESS',
    REQUEST_USER_REVIEWS_FAILURE: 'REQUEST_USER_REVIEWS_FAILURE',
    RESET_USER_REVIEWS_STATUS: 'RESET_USER_REVIEWS_STATUS',

    REVIEW_HELPFUL_START: 'REVIEW_HELPFUL_START',
    REVIEW_HELPFUL_SUCCESS: 'REVIEW_HELPFUL_SUCCESS',
    REVIEW_HELPFUL_FAILURE: 'REVIEW_HELPFUL_FAILURE',

    REPORT_REVIEW_START: 'REPORT_REVIEW_START',
    REPORT_REVIEW_SUCCESS: 'REPORT_REVIEW_SUCCESS',
    REPORT_REVIEW_FAILURE: 'REPORT_REVIEW_FAILURE',

    DELETE_REVIEW_START: 'DELETE_REVIEW_START',
    DELETE_REVIEW_SUCCESS: 'DELETE_REVIEW_SUCCESS',
    DELETE_REVIEW_FAILURE: 'DELETE_REVIEW_FAILURE',
    RESET_DELETE_REVIEW_STATUS: 'RESET_DELETE_REVIEW_STATUS',

    RESET_REVIEW_STATUS_MESSAGE: 'RESET_REVIEW_STATUS_MESSAGE'
};

export default ReviewActionTypes;