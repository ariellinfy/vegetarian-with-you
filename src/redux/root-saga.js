import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user-sagas';
import { restaurantSagas } from './restaurant/restaurant-sagas';
import { reviewSagas } from './review/review-sagas';


export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(restaurantSagas),
        call(reviewSagas),
    ])
}