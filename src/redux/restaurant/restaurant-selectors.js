import { createSelector } from 'reselect';

const selectRestaurant = state => state.restaurant;

export const selectTargetRestaurantInfo = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant);

export const selectTargetRestaurantInfoToMap = createSelector([selectTargetRestaurantInfo], targetRestaurant => {
    return Object.entries(targetRestaurant).filter(([key, value]) => value !== false && value.length > 0)
});

export const selectRestaurantToBeUpdate = createSelector([selectRestaurant], restaurant => restaurant.restaurantToBeUpdate);

export const selectRestaurantActionPending = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionPending);

export const selectRestaurantCreateSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantCreateSuccess);

export const selectRestaurantUpdateSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantUpdateSuccess);

export const selectRestaurantActionFailure = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionFailure);

export const selectCreateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.createRestaurantErr);

export const selectUpdateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.updateRestaurantErr);
