import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user-types';
import { signUpSuccess, signUpFailure } from './user-actions';

export function* request(url, method, headers, body, auth = null) {
    const options = { method, headers, body };
    const token = auth ? auth : null;
    try {
        const response = yield call(fetch, url, addHeader(options, token));
        console.log(response.json());
        const checkedResponse = yield response.json();
        console.log(checkedResponse);
        return JSON.parse(checkedResponse);
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
    if(response.ok) {
        return response.json();
    } else {
        console.log('fetch response failed');
    }
}

export function* signUp({payload: { publicName, email, password }}) {
    try {
        const url = 'http://localhost:5000/users/signup';
        const headers = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: publicName,
                email: email,
                password: password
            })
        };
        const response = yield call(fetch, url, headers);
        
        const user = yield response.json();

        // const user = yield call(request, , 'POST', undefined, body);
        if (user !== undefined) {
            yield put(signUpSuccess(user));
        } 
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart)
    ]);
}