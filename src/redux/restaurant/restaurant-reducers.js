import RestaurantActionTypes from './restaurant-types';
import { filterRestaurants } from './restaurant-utils';

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
    requestPending: false,
    requestRestaurantsErr: '',
    keyword: '',
    filteredRestaurants: [],
    sortbyFilter: 'Sort By'
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
        case RestaurantActionTypes.UPDATE_RESTAURANT_START:
            return {
                ...state,
                restaurantToBeUpdate: action.payload,
                restaurantActionPending: true,
                restaurantUpdateSuccess: false,
                restaurantActionFailure: false,
                updateRestaurantErr: ''
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
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                restaurantActionPending: false,
                restaurantUpdateSuccess: true,
                restaurantActionFailure: false,
                updateRestaurantErr: ''
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                createRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantCreateSuccess: false,
                restaurantActionFailure: true
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                updateRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantUpdateSuccess: false,
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
                requestPending: true
            };
        case RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                requestPending: false,
                allRestaurants: action.payload,
                requestRestaurantsErr: ''
            };
        case RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_FAILURE:
            return {
                ...state,
                requestPending: true,
                requestRestaurantsErr: action.payload
            };
        case RestaurantActionTypes.REQUEST_FILTERED_RESTAURANTS:
            return {
                ...state,
                filteredRestaurants: filterRestaurants(action.payload, state.allRestaurants),
                keyword: action.payload
            };
        case RestaurantActionTypes.RESET_FILTERED_RESTAURANTS:
            return {
                ...state,
                filteredRestaurants: [],
            };
        case RestaurantActionTypes.RESET_KEYWORD:
            return {
                ...state,
                keyword: action.payload,
            };
        case RestaurantActionTypes.SET_SORTBY_FILTER:
            return {
                ...state,
                sortbyFilter: action.payload,
            };
        case RestaurantActionTypes.RESET_SORTBY_FILTER:
            return {
                ...state,
                sortbyFilter: 'Sort By',
            };
        default:
            return state;
    }
}

export default restaurantReducer;