import RestaurantActionTypes from './restaurant-types';

const INITIAL_STATE = {
    targetRestaurant: {},
    restaurantToBeUpdate: {},
    restaurantActionPending: false,
    restaurantCreateSuccess: false,
    restaurantUpdateSuccess: false,
    restaurantActionFailure: false,
    createRestaurantErr: '',
    updateRestaurantErr: '',
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
        default:
            return state;
    }
}

export default restaurantReducer;