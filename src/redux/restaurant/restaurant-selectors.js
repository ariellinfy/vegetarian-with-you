import { createSelector } from 'reselect';

const selectRestaurants = state => state.restaurants;

export const selectRestaurantsAll = createSelector([selectRestaurants], restaurants => restaurants.restaurants);
