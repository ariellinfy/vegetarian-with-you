import RestaurantActionTypes from './restaurant-types';

const INITIAL_STATE = {
    restaurants: {},
    createRestaurantErr: '',
    updateRestaurantErr: '',
}

const restaurantReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
                createRestaurantErr: '',
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
                updateRestaurantErr: '',
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                createRestaurantErr: action.payload
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                updateRestaurantErr: action.payload
            };
        default:
            return state;
    }
}

export default restaurantReducer;