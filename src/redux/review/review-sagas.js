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

export function* createReview({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/reviews/createreview';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({

        });
        const reviews = yield call(request, url, method, headers, body, currentUserToken);
        if (reviews !== undefined) {
            localStorage.setItem('token', reviews.token);
            yield put(createReviewSuccess(reviews.data));
        } 
    } catch (error) {
        yield put(createReviewFailure(error));
    }
}

export function* updateReview({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/reviews/updatereview';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            
        });
        const reviews = yield call(request, url, method, headers, body, currentUserToken);
        if (reviews !== undefined) {
            localStorage.setItem('token', reviews.token);
            yield put(updateReviewSuccess(reviews.data));
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