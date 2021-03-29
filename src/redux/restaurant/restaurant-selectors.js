import { createSelector } from 'reselect';

const selectRestaurant = state => state.restaurant;

export const selectRestaurantAll = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant);

export const selectRestaurantId = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant.restaurant_id);

export const selectRestaurantActionPending = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionPending);

export const selectRestaurantActionSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionSuccess);

export const selectRestaurantActionFailure = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionFailure);

export const selectCreateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.createRestaurantErr);

export const selectUpdateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.updateRestaurantErr);
