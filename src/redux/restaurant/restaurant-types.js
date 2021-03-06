const RestaurantActionTypes = {
    CREATE_RESTAURANT_START: 'CREATE_RESTAURANT_START',
    CREATE_RESTAURANT_SUCCESS: 'CREATE_RESTAURANT_SUCCESS',
    CREATE_RESTAURANT_FAILURE: 'CREATE_RESTAURANT_FAILURE',
    RESET_CREATE_RESTAURANT_STATUS: 'RESET_CREATE_RESTAURANT_STATUS',

    RESTAURANT_TO_BE_UPDATE: 'RESTAURANT_TO_BE_UPDATE',
    UPDATE_RESTAURANT_START: 'UPDATE_RESTAURANT_START',
    UPDATE_RESTAURANT_SUCCESS: 'UPDATE_RESTAURANT_SUCCESS',
    UPDATE_RESTAURANT_FAILURE: 'UPDATE_RESTAURANT_FAILURE',
    RESET_UPDATE_RESTAURANT_STATUS: 'RESET_UPDATE_RESTAURANT_STATUS',

    REQUEST_ALL_RESTAURANTS_START: 'REQUEST_ALL_RESTAURANTS_START',
    REQUEST_ALL_RESTAURANTS_SUCCESS: 'REQUEST_ALL_RESTAURANTS_SUCCESS',
    REQUEST_ALL_RESTAURANTS_FAILURE: 'REQUEST_ALL_RESTAURANTS_FAILURE',
    SET_RESTAURANT_SORTBY_FILTER: 'SET_RESTAURANT_SORTBY_FILTER',
    RESET_REQUEST_RESTAURANTS_STATUS: 'RESET_REQUEST_RESTAURANTS_STATUS',

    REQUEST_FILTERED_RESTAURANTS: 'REQUEST_FILTERED_RESTAURANTS',
    REQUEST_FILTERED_RESTAURANTS_BY_FEATURE: 'REQUEST_FILTERED_RESTAURANTS_BY_FEATURE',
    REQUEST_FILTERED_RESTAURANTS_BY_LOCATION: 'REQUEST_FILTERED_RESTAURANTS_BY_LOCATION',
    RESET_FILTERED_RESTAURANTS: 'RESET_FILTERED_RESTAURANTS',

    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',

    REQUEST_RESTAURANT_BY_ID_START: 'REQUEST_RESTAURANT_BY_ID_START',
    REQUEST_RESTAURANT_BY_ID_SUCCESS: 'REQUEST_RESTAURANT_BY_ID_SUCCESS',
    REQUEST_RESTAURANT_BY_ID_FAILURE: 'REQUEST_RESTAURANT_BY_ID_FAILURE',
    RESET_RESTAURANT_BY_ID_STATUS: 'RESET_RESTAURANT_BY_ID_STATUS'
};

export default RestaurantActionTypes;