import RestaurantActionTypes from './restaurant-types';

const INITIAL_STATE = {
    targetRestaurant: {},
    actionSuccess: false,
    createRestaurantErr: '',
    updateRestaurantErr: '',
}

const restaurantReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                actionSuccess: true,
                createRestaurantErr: '',
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                targetRestaurant: action.payload,
                actionSuccess: true,
                updateRestaurantErr: '',
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                createRestaurantErr: action.payload,
                actionSuccess: false
            };
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                updateRestaurantErr: action.payload,
                actionSuccess: false
            };
        default:
            return state;
    }
}

export default restaurantReducer;