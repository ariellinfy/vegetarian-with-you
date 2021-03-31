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