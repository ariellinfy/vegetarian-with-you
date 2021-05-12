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
        photos.forEach(photo => formData.append('photoNew', photo));
        formData.append('disclosure', disclosure);
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onreview/createreview';
        const response = yield call(fetch, url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentUserToken}`
            },
            body: formData
        });
        const data = yield response.json();
        if (data.review) {
            yield put(createReviewSuccess(data.review));
        } else {
            yield put(createReviewFailure(data.error));
        }
    } catch (error) {
        console.log('create review', error);
        yield put(createReviewFailure(error));
    }
};

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
        photos.forEach(photo => {
            if (!photo.path) {
                return formData.append('photoNew', photo);
            }
        }); 
        const photoOld = photos.filter(photo => photo.path);
        formData.append('photoOld', JSON.stringify(photoOld));
        formData.append('disclosure', disclosure);
        const url = 'https://vegetarian-with-you-api.herokuapp.com/onreview/updatereview';
        const response = yield call(fetch, url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${currentUserToken}`
            },
            body: formData
        });
        const data = yield response.json();
        if (data.review) {
            yield put(updateReviewSuccess(data.review));
        } else {
            yield put(updateReviewFailure(data.error));
        }
    } catch (error) {
        console.log('update review', error);
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
        console.log('request reviews', error);
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
        console.log('request reviews with auth', error);
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
        console.log('request user reviews', error);
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
        console.log('helpful vote', error);
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
        console.log('report review', error);
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
        console.log('delete review', error);
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