import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user-reducers';
import restaurantReducer from './restaurant/restaurant-reducers';
import reviewReducer from './review/review-reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    restaurants: restaurantReducer,
    reviews: reviewReducer
});

export default persistReducer(persistConfig, rootReducer);