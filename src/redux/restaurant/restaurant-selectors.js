import { createSelector } from 'reselect';

const selectRestaurant = state => state.restaurant;

export const selectRestaurantAll = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant);

export const selectRestaurantId = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant.restaurant_id);

export const selectActionStatus = createSelector([selectRestaurant], restaurant => restaurant.actionSuccess);

export const selectCreateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.createRestaurantErr);
