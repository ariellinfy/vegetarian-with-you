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

export function* createReview({ payload: { restaurantId,
    foodRate, serviceRate, valueRate, atmosphereRate, 
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
    disclosure, photosToDelete, currentUserToken } 
}) {
    try {
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onreview/createreview';
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
            photos: photos,
            disclosure: disclosure,
            photosToDelete: photosToDelete
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.review) {
            yield put(createReviewSuccess(data.review));
        } else {
            yield put(createReviewFailure(data.error));
        }
    } catch (error) {
        yield put(createReviewFailure(error));
    }
};

export function* updateReview({ payload: { reviewId, restaurantId,
    foodRate, serviceRate, valueRate, atmosphereRate, 
    reviewTitle, reviewBody, visitPeriod, visitType, price, recommendDish, photos,
    disclosure, photosToDelete, currentUserToken } 
}) {
    try {
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onreview/updatereview';
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
            photos: photos,
            disclosure: disclosure,
            photosToDelete: photosToDelete
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.review) {
            yield put(updateReviewSuccess(data.review));
        } else {
            yield put(updateReviewFailure(data.error));
        }
    } catch (error) {
        yield put(updateReviewFailure(error));
    }
};

export function* requestReviews({ payload: { query } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/reviews${query}`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body);
        if (data.reviews) {
            yield put(requestReviewsSuccess(data.reviews));
        } else {
            yield put(requestReviewsFailure(data.error));
        }
    } catch (error) {
        yield put(requestReviewsFailure(error));
    }
};

export function* requestReviewsWithAuth({ payload: { query, currentUserToken } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/reviews/auth${query}`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.reviews) {
            yield put(requestReviewsAuthSuccess(data.reviews));
        } else {
            yield put(requestReviewsAuthFailure(data.error));
        }
    } catch (error) {
        yield put(requestReviewsAuthFailure(error));
    }
};

export function* requestUserReviews({ payload: { currentUserToken } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/reviews/user`;
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.reviews) {
            yield put(requestUserReviewsSuccess(data.reviews));
        } else {
            yield put(requestUserReviewsFailure(data.error));
        }
    } catch (error) {
        yield put(requestUserReviewsFailure(error));
    }
};

export function* reviewHelpful({ payload: { restaurant_id, review_id, userHelpful, currentUserToken } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/onreview/reviewhelpful`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurant_id,
            reviewId: review_id,
            userHelpful: userHelpful
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(reviewHelpfulSuccess());
        } else {
            yield put(reviewHelpfulFailure(data.error));
        }
    } catch (error) {
        yield put(reviewHelpfulFailure(error));
    }
};

export function* reportReview({ payload: { restaurantId, reviewId, reportText, currentUserToken } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/onreview/reportreview`;
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            restaurantId: restaurantId,
            reviewId: reviewId,
            reportText: reportText
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(reportReviewSuccess());
        } else {
            yield put(reportReviewFailure(data.error));
        }
    } catch (error) {
        yield put(reportReviewFailure(error));
    }
};

export function* deleteReview({ payload: { reviewId, restaurantId, confirmDelete, currentUserToken } }) {
    try {
        const url = `https://vegetarian-with-you-api.herokuapp.com/onreview/deletereview`;
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            reviewId: reviewId,
            restaurantId: restaurantId,
            confirmDelete: confirmDelete
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(deleteReviewSuccess());
        } else {
            yield put(deleteReviewFailure(data.error));
        }
    } catch (error) {
        yield put(deleteReviewFailure(error));
    }
};

export function* oncreateReviewStart() {
    yield takeLatest(ReviewActionTypes.CREATE_REVIEW_START, createReview);
};

export function* onUpdateReviewStart() {
    yield takeLatest(ReviewActionTypes.UPDATE_REVIEW_START, updateReview);
};

export function* onRequestReviewsStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_START, requestReviews);
};

export function* onRequestReviewsAuthStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_RESTAURANT_REVIEWS_AUTH_START, requestReviewsWithAuth);
};

export function* onRequestUserReviewStart() {
    yield takeLatest(ReviewActionTypes.REQUEST_USER_REVIEWS_START, requestUserReviews);
};

export function* onReviewHelpfulStart() {
    yield takeLatest(ReviewActionTypes.REVIEW_HELPFUL_START, reviewHelpful);
};

export function* onReportReviewStart() {
    yield takeLatest(ReviewActionTypes.REPORT_REVIEW_START, reportReview);
};

export function* onDeleteReviewStart() {
    yield takeLatest(ReviewActionTypes.DELETE_REVIEW_START, deleteReview);
};

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
};