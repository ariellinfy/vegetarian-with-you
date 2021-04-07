import RestaurantActionTypes from './restaurant-types';
import { filterRestaurants, filterRestaurantsByFeature, filterRestaurantsByLocation } from './restaurant-utils';

const INITIAL_STATE = {
    targetRestaurant: {},
    restaurantToBeUpdate: {},
    restaurantActionPending: false,
    restaurantCreateSuccess: false,
    restaurantUpdateSuccess: false,
    restaurantActionFailure: false,
    createRestaurantErr: '',
    updateRestaurantErr: '',
    allRestaurants: [],
    restaurantRequestPending: false,
    restaurantRequestSuccess: false,
    requestRestaurantsErr: '',
    sortbyFilter: 'Sort By',
    filteredRestaurants: [],
    keyword: '',
    keywordFeature: '',
    keywordLocation: '',
}

const restaurantReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case RestaurantActionTypes.CREATE_RESTAURANT_START:
            return {
                ...state,
                targetRestaurant: {},
                restaurantActionPending: true,
                restaurantCreateSuccess: false,
                restaurantActionFailure: false,
                createRestaurantErr: ''
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                restaurantActionPending: false,
                restaurantCreateSuccess: true,
                restaurantActionFailure: false,
                createRestaurantErr: ''
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                createRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantCreateSuccess: false,
                restaurantActionFailure: true
            };
        case RestaurantActionTypes.RESET_CREATE_RESTAURANT_STATUS:
            return {
                ...state,
                targetRestaurant: {},
                restaurantActionPending: false,
                restaurantCreateSuccess: false,
                restaurantActionFailure: false,
                createRestaurantErr: ''
            };
        
        case RestaurantActionTypes.UPDATE_RESTAURANT_START:
            return {
                ...state,
                restaurantToBeUpdate: action.payload,
                restaurantActionPending: true,
                restaurantUpdateSuccess: false,
                restaurantActionFailure: false,
                updateRestaurantErr: ''
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                restaurantActionPending: false,
                restaurantUpdateSuccess: true,
                restaurantActionFailure: false,
                updateRestaurantErr: ''
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                updateRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantUpdateSuccess: false,
                restaurantActionFailure: true
            };
        case RestaurantActionTypes.RESET_UPDATE_RESTAURANT_STATUS:
            return {
                ...state,
                targetRestaurant: {},
                restaurantToBeUpdate: {},
                restaurantActionPending: false,
                restaurantUpdateSuccess: false,
                restaurantActionFailure: false,
                updateRestaurantErr: ''
            };

        case RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_START:
            return {
                ...state,
                restaurantRequestPending: true,
                restaurantRequestSuccess: false
            };
        case RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                restaurantRequestPending: false,
                restaurantRequestSuccess: true,
                allRestaurants: action.payload,
                requestRestaurantsErr: ''
            };
        case RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_FAILURE:
            return {
                ...state,
                restaurantRequestPending: false,
                restaurantRequestSuccess: false,
                requestRestaurantsErr: action.payload
            };
        case RestaurantActionTypes.SET_SORTBY_FILTER:
            return {
                ...state,
                sortbyFilter: action.payload,
            };
        case RestaurantActionTypes.RESET_REQUEST_RESTAURANTS_STATUS:
            return {
                ...state,
                allRestaurants: [],
                restaurantRequestPending: false,
                restaurantRequestSuccess: false,
                requestRestaurantsErr: '',
                sortbyFilter: 'Sort By',
            };

        case RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS:
            return {
                ...state,
                filteredRestaurants: filterRestaurants(action.payload, state.allRestaurants),
                keyword: action.payload
            };
        case RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS_BY_FEATURE:
            return {
                ...state,
                filteredRestaurants: filterRestaurantsByFeature(action.payload, state.keywordLocation, state.allRestaurants, state.filteredRestaurants),
                keywordFeature: action.payload
            };
        case RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS_BY_LOCATION:
            return {
                ...state,
                filteredRestaurants: filterRestaurantsByLocation(action.payload, state.keywordFeature, state.allRestaurants, state.filteredRestaurants),
                keywordLocation: action.payload
            };
        case RestaurantActionTypes.RESET_FILTERED_RESTAURANTS:
            return {
                ...state,
                filteredRestaurants: [],
                keyword: '',
                keywordFeature: '',
                keywordLocation: '',
            };
        
        case RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_START:
            return {
                ...state,
                targetRestaurant: {},
                restaurantRequestPending: true,
                restaurantRequestSuccess: false
            };
        case RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                restaurantRequestPending: false,
                restaurantRequestSuccess: true,
                targetRestaurant: action.payload,
                requestRestaurantsErr: ''
            };
        case RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_FAILURE:
            return {
                ...state,
                restaurantRequestPending: false,
                restaurantRequestSuccess: false,
                requestRestaurantsErr: action.payload
            };
        case RestaurantActionTypes.RESET_RESTAURANT_BY_ID_STATUS:
            return {
                ...state,
                targetRestaurant: {},
                restaurantRequestPending: false,
                restaurantRequestSuccess: false,
                requestRestaurantsErr: '',
            };

        default:
            return state;
    }
}

export default restaurantReducer;