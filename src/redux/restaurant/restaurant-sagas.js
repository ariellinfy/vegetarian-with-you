import { takeLatest, put, all, call } from 'redux-saga/effects';
import RestaurantActionTypes from './restaurant-types';
import { 
    createRestaurantSuccess, createRestaurantFailure, 
    updateRestaurantSuccess, updateRestaurantFailure, 
    requestAllRestaurantsSuccess, requestAllRestaurantsFailure,
    requestRestaurantByIdSuccess, requestRestaurantByIdFailure,
} from './restaurant-actions';

export function* request(url, method, headers, body, auth = null) {
    const options = { method, headers, body };
    const token = auth ? auth : null;
    try {
        const response = yield call(fetch, url, addHeader(options, token));
        return yield response.json();
    } catch (e) {
       console.log(e, 'something went wrong');
    }
};

function addHeader(options = {}, token) {
    const newOptions = { ...options };
    if (!options.headers) {
      newOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      };
    }
    if (token) {
      newOptions.headers.Authorization = `Bearer ${token}`;
    }
    return newOptions;
};

export function* createRestaurant({ payload: 
    { restaurantName, restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
      restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
      breakfast, brunch, lunch, dinner,
      restaurantWifi, restaurantTakeout, restaurantDelivery, restaurantPungent,
      currentUserToken } 
}) {
    try {
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onrestaurant/createrestaurant';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({
            restaurantName: restaurantName, 
            restaurantAddress: restaurantAddress, 
            restaurantCity: restaurantCity, 
            restaurantRegion: restaurantRegion, 
            restaurantCountry: restaurantCountry, 
            restaurantPostalCode: restaurantPostalCode, 
            restaurantPhone: restaurantPhone,
            restaurantWebsite: restaurantWebsite,
            restaurantType: restaurantType,
            restaurantCuisine: restaurantCuisine,
            breakfast: breakfast,
            brunch: brunch,
            lunch: lunch,
            dinner: dinner,
            restaurantWifi: restaurantWifi,
            restaurantTakeout: restaurantTakeout,
            restaurantDelivery: restaurantDelivery,
            restaurantPungent: restaurantPungent
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.restaurant) {
            yield put(createRestaurantSuccess(data.restaurant));
        } else {
            yield put(createRestaurantFailure(data.error));
        }
    } catch (error) {
        console.log('create restaurant', error);
        yield put(createRestaurantFailure(error));
    }
};

export function* updateRestaurant({ payload: { restaurantId, restaurantName, 
    restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
    restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
    breakfast, brunch, lunch, dinner,
    restaurantWifi, restaurantTakeout, restaurantDelivery, restaurantPungent,
    currentUserToken } }) {
    try {
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onrestaurant/updaterestaurant';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurantId,
            restaurantName: restaurantName, 
            restaurantAddress: restaurantAddress, 
            restaurantCity: restaurantCity, 
            restaurantRegion: restaurantRegion, 
            restaurantCountry: restaurantCountry, 
            restaurantPostalCode: restaurantPostalCode, 
            restaurantPhone: restaurantPhone,
            restaurantWebsite: restaurantWebsite,
            restaurantType: restaurantType,
            restaurantCuisine: restaurantCuisine,
            breakfast: breakfast,
            brunch: brunch,
            lunch: lunch,
            dinner: dinner,
            restaurantWifi: restaurantWifi,
            restaurantTakeout: restaurantTakeout,
            restaurantDelivery: restaurantDelivery,
            restaurantPungent: restaurantPungent
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.restaurant) {
            yield put(updateRestaurantSuccess(data.restaurant));
        } else {
            yield put(updateRestaurantFailure(data.error));
        }
    } catch (error) {
        console.log('update restaurant', error);
        yield put(updateRestaurantFailure(error));
    }
};

export function* restaurantsQuerySelector({ payload }) {
    try {
        let url = '';
        if (payload) {
            url = `https://vegetarian-with-you-api.herokuapp.com/restaurants${payload}`;
        } else {
            url = `https://vegetarian-with-you-api.herokuapp.com/restaurants`;
        };
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body);
        if (data.restaurants) {
            yield put(requestAllRestaurantsSuccess(data.restaurants));
        } else {
            yield put(requestAllRestaurantsFailure(data.error));
        }
    } catch (error) {
        console.log('request all restaurants', error);
        yield put(requestAllRestaurantsFailure(error));
    }
};

export function* requestRestaurantById({ payload }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/restaurants/${payload}`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body);
        if (data.restaurant) {
            yield put(requestRestaurantByIdSuccess(data.restaurant));
        } else {
            yield put(requestRestaurantByIdFailure(data.error));
        }
    } catch (error) {
        console.log('request restaurant by id', error);
        yield put(requestRestaurantByIdFailure(error));
    }
};

export function* oncreateRestaurantStart() {
    yield takeLatest(RestaurantActionTypes.CREATE_RESTAURANT_START, createRestaurant);
};

export function* onUpdateRestaurantStart() {
    yield takeLatest(RestaurantActionTypes.UPDATE_RESTAURANT_START, updateRestaurant);
};

export function* onRequestAllRestaurantsStart() {
    yield takeLatest(RestaurantActionTypes.REQUEST_ALL_RESTAURANTS_START, restaurantsQuerySelector);
};

export function* onRequestRestaurantByIdStart() {
    yield takeLatest(RestaurantActionTypes.REQUEST_RESTAURANT_BY_ID_START, requestRestaurantById);
};

export function* restaurantSagas() {
    yield all([
        call(oncreateRestaurantStart),
        call(onUpdateRestaurantStart),
        call(onRequestAllRestaurantsStart),
        call(onRequestRestaurantByIdStart),
    ]);
};