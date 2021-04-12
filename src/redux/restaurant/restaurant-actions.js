import RestaurantActionTypes from './restaurant-types';

// Create restaurant

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

export const resetCreateRestaurantStatus = () => ({
    type: RestaurantActionTypes.RESET_CREATE_RESTAURANT_STATUS
});

// Update restaurant

export const setRestaurantToBeUpdate = targetRestaurant => ({
    type: RestaurantActionTypes.RESTAURANT_TO_BE_UPDATE,
    payload: targetRestaurant
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

export const resetUpdateRestaurantStatus = () => ({
    type: RestaurantActionTypes.RESET_UPDATE_RESTAURANT_STATUS
});

// Request restaurants

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

export const setRestaurantSortbyFilter = filter => ({
    type: RestaurantActionTypes.SET_RESTAURANT_SORTBY_FILTER,
    payload: filter
});

export const resetRequestRestaurantsStatus = () => ({
    type: RestaurantActionTypes.RESET_REQUEST_RESTAURANTS_STATUS,
});

// Filter restaurants

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

// Request target restaurant by ID

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

export const resetRestaurantByIdStatus = () => ({
    type: RestaurantActionTypes.RESET_RESTAURANT_BY_ID_STATUS,
});