import RestaurantActionTypes from './restaurant-types';

const INITIAL_STATE = {
    targetRestaurant: {},
    restaurantActionPending: false,
    restaurantActionSuccess: false,
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
                restaurantActionSuccess: false,
                restaurantActionFailure: false,
                createRestaurantErr: '',
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_START:
            return {
                ...state,
                targetRestaurant: {},
                restaurantActionPending: true,
                restaurantActionSuccess: false,
                restaurantActionFailure: false,
                createRestaurantErr: '',
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                restaurantActionPending: false,
                restaurantActionSuccess: true,
                restaurantActionFailure: false,
                createRestaurantErr: '',
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                restaurantActionPending: false,
                restaurantActionSuccess: true,
                restaurantActionFailure: false,
                updateRestaurantErr: '',
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                createRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantActionSuccess: false,
                restaurantActionFailure: true,
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                updateRestaurantErr: action.payload,
                restaurantActionPending: false,
                restaurantActionSuccess: false,
                restaurantActionFailure: true,
            };
        case RestaurantActionTypes.RESET_RESTAURANT_STATUS:
            return {
                ...state,
                targetRestaurant: {},
                restaurantActionPending: false,
                restaurantActionSuccess: false,
                restaurantActionFailure: false,
                createRestaurantErr: '',
                updateRestaurantErr: '',
            };
        default:
            return state;
    }
}

export default restaurantReducer;