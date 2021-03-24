import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user-types';
import { signUpSuccess, signUpFailure, signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user-actions';

export function* request(url, method, headers, body, auth = null) {
    const options = { method, headers, body };
    const token = auth ? auth : null;
    try {
        const response = yield call(fetch, url, addHeader(options, token));
        const checkedResponse = yield checkStatus(response);
        console.log(checkedResponse);
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

export function* signUp({ payload: { publicName, email, password } }) {
    try {
        const url = 'http://localhost:5000/users/signup';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({
            name: publicName,
            email: email,
            password: password
        });
        const user = yield call(request, url, method, headers, body);
        if (user !== undefined) {
            yield put(signUpSuccess(user));
        } 
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signIn({ payload: { email, password } }) {
    try {
        const url = 'http://localhost:5000/users/signin';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({
            email: email,
            password: password
        });
        const user = yield call(request, url, method, headers, body);
        if (user !== undefined) {
            yield put(signInSuccess(user));
        } 
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut({ payload: { currentUser, token } }) {
    try {
        const url = 'http://localhost:5000/users/signout';
        const method = 'POST';
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = null;
        yield call(request, url, method, headers, body);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignInStart),
        call(onSignOutStart)
    ]);
}