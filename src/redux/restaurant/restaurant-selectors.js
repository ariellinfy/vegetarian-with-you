import { createSelector } from 'reselect';

const selectRestaurant = state => state.restaurant;

export const selectTargetRestaurantInfo = createSelector([selectRestaurant], restaurant => restaurant.targetRestaurant);

export const selectTargetRestaurantInfoToMap = createSelector([selectTargetRestaurantInfo], targetRestaurant => {
    return Object.entries(targetRestaurant).filter(([key, value]) => value !== false && value.length > 0)
});

// Create / Update restaurant actions

export const selectRestaurantToBeUpdate = createSelector([selectRestaurant], restaurant => restaurant.restaurantToBeUpdate);

export const selectRestaurantActionPending = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionPending);

export const selectRestaurantCreateSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantCreateSuccess);

export const selectRestaurantUpdateSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantUpdateSuccess);

export const selectRestaurantActionFailure = createSelector([selectRestaurant], restaurant => restaurant.restaurantActionFailure);

export const selectCreateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.createRestaurantErr);

export const selectUpdateRestaurantErr = createSelector([selectRestaurant], restaurant => restaurant.updateRestaurantErr);

// Request restaurants

export const selectAllRestaurants = createSelector([selectRestaurant], restaurant => restaurant.allRestaurants);

export const selectRestaurantRequestPending = createSelector([selectRestaurant], restaurant => restaurant.restaurantRequestPending);

export const selectRestaurantRequestSuccess = createSelector([selectRestaurant], restaurant => restaurant.restaurantRequestSuccess);

export const selectRequestRestaurantsErr = createSelector([selectRestaurant], restaurant => restaurant.requestRestaurantsErr);

export const selectSortbyFilter = createSelector([selectRestaurant], restaurant => restaurant.sortbyFilter);

// Filter restaurants

export const selectFilteredRestaurants = createSelector([selectRestaurant], restaurant => restaurant.filteredRestaurants);

export const selectFilterKeyword = createSelector([selectRestaurant], restaurant => restaurant.keyword);

export const selectFilterFeatureKeyword = createSelector([selectRestaurant], restaurant => restaurant.keywordFeature);

export const selectFilterLocationKeyword = createSelector([selectRestaurant], restaurant => restaurant.keywordLocation);