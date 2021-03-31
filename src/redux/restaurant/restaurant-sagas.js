import { takeLatest, put, all, call } from 'redux-saga/effects';
import RestaurantActionTypes from './restaurant-types';
import { 
    createRestaurantSuccess, createRestaurantFailure, 
    updateRestaurantSuccess, updateRestaurantFailure, 
} from './restaurant-actions';

export function* request(url, method, headers, body, auth = null) {
    const options = { method, headers, body };
    const token = auth ? auth : null;
    try {
        const response = yield call(fetch, url, addHeader(options, token));
        const checkedResponse = yield checkStatus(response);
        return checkedResponse;
    } catch (e) {
       console.log(e, 'something went wrong');
    }
}

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
}

function checkStatus(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.log('fetch response failed');
    }
}

export function* createRestaurant({ payload: 
    { restaurantName, 
      restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
      restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
      breakfast, brunch, lunch, dinner,
      restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent,
      currentUserToken } 
}) {
    try {
        const url = 'http://localhost:5000/onrestaurant/createrestaurant';
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
            restaurantTakeaway: restaurantTakeaway,
            restaurantDelivery: restaurantDelivery,
            restaurantPungent: restaurantPungent
        });
        const restaurant = yield call(request, url, method, headers, body, currentUserToken);
        if (restaurant !== undefined) {
            localStorage.setItem('token', restaurant.token);
            yield put(createRestaurantSuccess(restaurant.data));
        } 
    } catch (error) {
        yield put(createRestaurantFailure(error));
    }
}

export function* updateRestaurant({ payload: { restaurantId, restaurantName, 
    restaurantAddress, restaurantCity, restaurantRegion, restaurantCountry, restaurantPostalCode, 
    restaurantPhone, restaurantWebsite, restaurantType, restaurantCuisine,
    breakfast, brunch, lunch, dinner,
    restaurantWifi, restaurantTakeaway, restaurantDelivery, restaurantPungent,
    currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/onrestaurant/updaterestaurant';
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
            restaurantTakeaway: restaurantTakeaway,
            restaurantDelivery: restaurantDelivery,
            restaurantPungent: restaurantPungent
        });
        const restaurant = yield call(request, url, method, headers, body, currentUserToken);
        if (restaurant !== undefined) {
            localStorage.setItem('token', restaurant.token);
            yield put(updateRestaurantSuccess(restaurant.data));
        } 
    } catch (error) {
        yield put(updateRestaurantFailure(error));
    }
}

export function* oncreateRestaurantStart() {
    yield takeLatest(RestaurantActionTypes.CREATE_RESTAURANT_START, createRestaurant);
}

export function* onUpdateRestaurantStart() {
    yield takeLatest(RestaurantActionTypes.UPDATE_RESTAURANT_START, updateRestaurant);
}

export function* restaurantSagas() {
    yield all([
        call(oncreateRestaurantStart),
        call(onUpdateRestaurantStart),
    ]);
}