import RestaurantActionTypes from './restaurant-types';

export const createRestaurantStart = restaurantInfo => ({
    type: RestaurantActionTypes.CREATE_RESTAURANT_START,
    payload: restaurantInfo
});

export const createRestaurantSuccess = restaurant => ({
    type: RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS,
    payload: restaurant
});

export const createRestaurantFailure = error => ({
    type: RestaurantActionTypes.CREATE_RESTAURANT_FAILURE,
    payload: error
});

export const updateRestaurantStart = restaurantInfo => ({
    type: RestaurantActionTypes.UPDATE_RESTAURANT_START,
    payload: restaurantInfo
});

export const updateRestaurantSuccess = restaurant => ({
    type: RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS,
    payload: restaurant
});

export const updateRestaurantFailure = error => ({
    type: RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE,
    payload: error
});

export const resetCreateRestaurantStatus = () => ({
    type: RestaurantActionTypes.RESET_CREATE_RESTAURANT_STATUS
});

export const resetUpdateRestaurantStatus = () => ({
    type: RestaurantActionTypes.RESET_UPDATE_RESTAURANT_STATUS
});


export const requestAllRestaurantsStart = query => ({
    type: RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_START,
    payload: query
});

export const requestAllRestaurantsSuccess = restaurants => ({
    type: RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_SUCCESS,
    payload: restaurants
});

export const requestAllRestaurantsFailure = error => ({
    type: RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_FAILURE,
    payload: error
});

export const requestFilteredRestaurants = keyword => ({
    type: RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS,
    payload: keyword
});

export const requestFilteredRestaurantsByFeature = keyword => ({
    type: RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS_BY_FEATURE,
    payload: keyword
});

export const requestFilteredRestaurantsByLocation = keyword => ({
    type: RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS_BY_LOCATION,
    payload: keyword
});

export const resetFilteredRestaurants = () => ({
    type: RestaurantActionTypes.RESET_FILTERED_RESTAURANTS,
});

export const resetKeyword = () => ({
    type: RestaurantActionTypes.RESET_KEYWORD,
});

export const resetFeatureKeyword = () => ({
    type: RestaurantActionTypes.RESET_FEATURE_KEYWORD,
});

export const resetLocationKeyword = () => ({
    type: RestaurantActionTypes.RESET_LOCATION_KEYWORD,
});

export const setSortbyFilter = filter => ({
    type: RestaurantActionTypes.SET_SORTBY_FILTER,
    payload: filter
});

export const resetSortbyFilter = () => ({
    type: RestaurantActionTypes.RESET_SORTBY_FILTER,
});

export const requestRestaurantByIdStart = restaurantId => ({
    type: RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_START,
    payload: restaurantId
});

export const requestRestaurantByIdSuccess = restaurant => ({
    type: RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_SUCCESS,
    payload: restaurant
});

export const requestRestaurantByIdFailure = error => ({
    type: RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_FAILURE,
    payload: error
});