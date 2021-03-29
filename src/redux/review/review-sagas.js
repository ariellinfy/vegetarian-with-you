import { takeLatest, put, all, call } from 'redux-saga/effects';
import ReviewActionTypes from './review-types';
import { 
    createReviewSuccess, createReviewFailure, 
    updateReviewSuccess, updateReviewFailure, 
} from './review-actions';

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

export function* createReview({ payload: { restaurantId, foodRate, serviceRate, valueRate, atmosphereRate, reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, disclosure, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/onreview/createreview';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurantId,
            foodRate: foodRate,
            serviceRate: serviceRate,
            valueRate: valueRate,
            atmosphereRate: atmosphereRate,
            reviewTitle: reviewTitle,
            reviewBody: reviewBody,
            visitPeriod: visitPeriod,
            visitType: visitType,
            price: price,
            recommendDish: recommendDish,
            disclosure: disclosure
        });
        const review = yield call(request, url, method, headers, body, currentUserToken);
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(createReviewSuccess(review.data));
        } 
    } catch (error) {
        yield put(createReviewFailure(error));
    }
}

export function* updateReview({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/onreview/updatereview';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            
        });
        const review = yield call(request, url, method, headers, body, currentUserToken);
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(updateReviewSuccess(review.data));
        } 
    } catch (error) {
        yield put(updateReviewFailure(error));
    }
}

export function* oncreateReviewStart() {
    yield takeLatest(ReviewActionTypes.CREATE_REVIEW_START, createReview);
}

export function* onUpdateReviewStart() {
    yield takeLatest(ReviewActionTypes.UPDATE_REVIEW_START, updateReview);
}

export function* reviewSagas() {
    yield all([
        call(oncreateReviewStart),
        call(onUpdateReviewStart),
    ]);
}