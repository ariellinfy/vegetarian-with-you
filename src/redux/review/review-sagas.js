import { takeLatest, put, all, call } from 'redux-saga/effects';
import ReviewActionTypes from './review-types';
import { 
    createReviewSuccess, createReviewFailure, 
    updateReviewSuccess, updateReviewFailure, 
    requestReviewsSuccess, requestReviewsFailure, 
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
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, 
    disclosure, currentUserToken } 
}) {
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

export function* updateReview({ payload: { reviewId, restaurantId,
    foodRate, serviceRate, valueRate, atmosphereRate, 
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, 
    disclosure, currentUserToken } 
}) {
    try {
        const url = 'http://localhost:5000/onreview/updatereview';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
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
            yield put(updateReviewSuccess(review.data));
        } 
    } catch (error) {
        yield put(updateReviewFailure(error));
    }
}

export function* requestReviews({ payload }) {
    try {
        const url = `http://localhost:5000/reviews${payload}`;
        console.log(url);
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

export function* reviewHelpful({ payload: { reviewId, userHelpful, helpfulCount, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/reviewhelpful`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
            userHelpful: userHelpful,
            helpfulCount: helpfulCount
        });
        const review = yield call(request, url, method, headers, body, currentUserToken);
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(reviewHelpfulSuccess());
        } 
    } catch (error) {
        yield put(reviewHelpfulFailure(error));
    }
}

export function* reportReview({ payload: { reviewId, user_report, report_count, reportText, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/reportreview`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
            user_report: user_report,
            report_count: report_count,
            reportText: reportText
        });
        const review = yield call(request, url, method, headers, body, currentUserToken);
        if (review !== undefined) {
            localStorage.setItem('token', review.token);
            yield put(reportReviewSuccess());
        } 
    } catch (error) {
        yield put(reportReviewFailure(error));
    }
}

export function* deleteReview({ payload: { reviewId, currentUserToken } }) {
    try {
        const url = `http://localhost:5000/onreview/deletereview`;
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
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
        call(onReviewHelpfulStart),
        call(onReportReviewStart),
        call(onDeleteReviewStart),
    ]);
}