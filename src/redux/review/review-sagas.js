import { takeLatest, put, all, call } from 'redux-saga/effects';
import ReviewActionTypes from './review-types';
import { 
    createReviewSuccess, createReviewFailure, 
    updateReviewSuccess, updateReviewFailure, 
    requestReviewsSuccess, requestReviewsFailure, 
    requestReviewsAuthSuccess, requestReviewsAuthFailure,
    requestUserReviewsSuccess, requestUserReviewsFailure,
    reviewHelpfulSuccess, reviewHelpfulFailure, 
    reportReviewSuccess, reportReviewFailure,
    deleteReviewSuccess, deleteReviewFailure
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

export function* createReview({ payload: { restaurantId,
    foodRate, serviceRate, valueRate, atmosphereRate, 
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
    disclosure, currentUserToken } 
}) {
    try {
        const formData = new FormData();
        formData.append('restaurantId', restaurantId);
        formData.append('foodRate', foodRate);
        formData.append('serviceRate', serviceRate);
        formData.append('valueRate', valueRate);
        formData.append('atmosphereRate', atmosphereRate);
        formData.append('reviewTitle', reviewTitle);
        formData.append('reviewBody', reviewBody);
        formData.append('visitPeriod', visitPeriod);
        formData.append('visitType', visitType);
        formData.append('price', price);
        formData.append('recommendDish', recommendDish);
        photos.forEach(photo => formData.append('photos', photo));
        formData.append('disclosure', disclosure);
        const url = 'http://localhost:5000/onreview/createreview';
        const response = yield call(fetch, url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentUserToken}`
            },
            body: formData
        });
        const review = yield response.json();
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(createReviewSuccess(review.data));
        } 
    } catch (error) {
        yield put(createReviewFailure(error));
    }
}

export function* updateReview({ payload: { reviewId, restaurantId,
    foodRate, serviceRate, valueRate, atmosphereRate, 
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
    disclosure, currentUserToken } 
}) {
    try {
        const formData = new FormData();
        formData.append('reviewId', reviewId);
        formData.append('restaurantId', restaurantId);
        formData.append('foodRate', foodRate);
        formData.append('serviceRate', serviceRate);
        formData.append('valueRate', valueRate);
        formData.append('atmosphereRate', atmosphereRate);
        formData.append('reviewTitle', reviewTitle);
        formData.append('reviewBody', reviewBody);
        formData.append('visitPeriod', visitPeriod);
        formData.append('visitType', visitType);
        formData.append('price', price);
        formData.append('recommendDish', recommendDish);
        photos.forEach(photo => formData.append('photos', photo));
        formData.append('disclosure', disclosure);
        const url = 'http://localhost:5000/onreview/updatereview';
        const response = yield call(fetch, url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${currentUserToken}`
            },
            body: formData
        });
        const review = yield response.json();
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(createReviewSuccess(review.data));
        } 
    } catch (error) {
        yield put(updateReviewFailure(error));
    }
}

export function* requestReviews({ payload: { query } }) {
    try {
        const url = `http://localhost:5000/reviews${query}`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const reviews = yield call(request, url, method, headers, body);
        if (reviews !== undefined) {
            yield put(requestReviewsSuccess(reviews.data));
        } 
    } catch (error) {
        yield put(requestReviewsFailure(error));
    }
}

export function* requestReviewsWithAuth({ payload: { query, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/reviews/auth${query}`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const reviews = yield call(request, url, method, headers, body, currentUserToken);
        if (reviews !== undefined) {
            localStorage.setItem('token', reviews.token);
            yield put(requestReviewsAuthSuccess(reviews.data));
        } 
    } catch (error) {
        yield put(requestReviewsAuthFailure(error));
    }
}

export function* requestUserReviews({ payload }) {
    try {
        if (!payload.length) {
            yield put(requestUserReviewsFailure('please provide user token'));
        };
        const url = `http://localhost:5000/reviews/user`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const reviews = yield call(request, url, method, headers, body, payload);
        if (reviews !== undefined) {
            localStorage.setItem('token', reviews.token);
            yield put(requestUserReviewsSuccess(reviews.data));
        } 
    } catch (error) {
        yield put(requestUserReviewsFailure(error));
    }
}

export function* reviewHelpful({ payload: { restaurant_id, review_id, userHelpful, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/reviewhelpful`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurant_id,
            reviewId: review_id,
            userHelpful: userHelpful
        });
        const token = yield call(request, url, method, headers, body, currentUserToken);
        if (token !== undefined) {
            localStorage.setItem('token', token);
            yield put(reviewHelpfulSuccess());
        } 
    } catch (error) {
        yield put(reviewHelpfulFailure(error));
    }
}

export function* reportReview({ payload: { restaurantId, reviewId, reportText, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/reportreview`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurantId,
            reviewId: reviewId,
            reportText: reportText
        });
        const token = yield call(request, url, method, headers, body, currentUserToken);
        if (token !== undefined) {
            localStorage.setItem('token', token);
            yield put(reportReviewSuccess());
        } 
    } catch (error) {
        yield put(reportReviewFailure(error));
    }
}

export function* deleteReview({ payload: { reviewId, restaurantId, confirmDelete, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/deletereview`;
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
            restaurantId: restaurantId,
            confirmDelete: confirmDelete
        });
        const token = yield call(request, url, method, headers, body, currentUserToken);
        if (token !== undefined) {
            localStorage.setItem('token', token);
            yield put(deleteReviewSuccess());
        } 
    } catch (error) {
        yield put(deleteReviewFailure(error));
    }
}

export function* oncreateReviewStart() {
    yield takeLatest(ReviewActionTypes.CREATE_REVIEW_START, createReview);
}

export function* onUpdateReviewStart() {
    yield takeLatest(ReviewActionTypes.UPDATE_REVIEW_START, updateReview);
}

export function* onRequestReviewsStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_START, requestReviews);
}

export function* onRequestReviewsAuthStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_START, requestReviewsWithAuth);
}

export function* onRequestUserReviewStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_USER_REVIEWS_START, requestUserReviews);
}

export function* onReviewHelpfulStart() {
    yield takeLatest(ReviewActionTypes.REVIEW_HELPFUL_START, reviewHelpful);
}

export function* onReportReviewStart() {
    yield takeLatest(ReviewActionTypes.REPORT_REVIEW_START, reportReview);
}

export function* onDeleteReviewStart() {
    yield takeLatest(ReviewActionTypes.DELETE_REVIEW_START, deleteReview);
}

export function* reviewSagas() {
    yield all([
        call(oncreateReviewStart),
        call(onUpdateReviewStart),
        call(onRequestReviewsStart),
        call(onRequestReviewsAuthStart),
        call(onRequestUserReviewStart),
        call(onReviewHelpfulStart),
        call(onReportReviewStart),
        call(onDeleteReviewStart),
    ]);
}