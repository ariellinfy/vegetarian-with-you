import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user-types';
import { 
    signUpSuccess, signUpFailure, 
    signInSuccess, signInFailure, 
    signOutSuccess, signOutFailure, 
    editProfileSuccess, editProfileFailure, 
    resetPasswordSuccess, resetPasswordFailure, 
    updateEmailSuccess, updateEmailFailure,
    closeAccountSuccess, closeAccountFailure,
} from './user-actions';

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
            localStorage.setItem('token', user.token);
            yield put(signUpSuccess(user.user));
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
            localStorage.setItem('token', user.token);
            yield put(signInSuccess(user.user));
        } 
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/signout';
        const method = 'POST';
        const headers = null;
        const body = null;
        yield call(request, url, method, headers, body, currentUserToken);
        localStorage.removeItem('token');
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* editProfile({ payload: { name, city, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/editprofile';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            public_name: name,
            location: city
        });
        const user = yield call(request, url, method, headers, body, currentUserToken);
        if (user !== undefined) {
            localStorage.setItem('token', user.token);
            yield put(editProfileSuccess(user.user));
        } 
    } catch (error) {
        yield put(editProfileFailure(error));
    }
}

export function* resetPassword({ payload: { email, oldPassword, newPassword, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/resetpassword';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        const user = yield call(request, url, method, headers, body, currentUserToken);
        if (user !== undefined) {
            localStorage.setItem('token', user.token);
            yield put(resetPasswordSuccess(user.user));
        } 
    } catch (error) {
        yield put(resetPasswordFailure(error));
    }
}

export function* updateEmail({ payload: { email, userEmail, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/updateemail';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            oldEmail: email,
            newEmail: userEmail
        });
        const user = yield call(request, url, method, headers, body, currentUserToken);
        if (user !== undefined) {
            localStorage.setItem('token', user.token);
            yield put(updateEmailSuccess(user.user));
        } 
    } catch (error) {
        yield put(updateEmailFailure(error));
    }
}

export function* closeAccount({ payload: { email, confirmPassword, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/closeaccount';
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            email: email,
            password: confirmPassword
        });
        yield call(request, url, method, headers, body, currentUserToken);
        localStorage.removeItem('token');
        yield put(closeAccountSuccess());
    } catch (error) {
        yield put(closeAccountFailure(error));
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

export function* onEditProfileStart() {
    yield takeLatest(UserActionTypes.EDIT_PROFILE_START, editProfile);
}

export function* onResetPasswordStart() {
    yield takeLatest(UserActionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* onUpdateEmailStart() {
    yield takeLatest(UserActionTypes.UPDATE_EMAIL_START, updateEmail);
}

export function* onCloseAccountStart() {
    yield takeLatest(UserActionTypes.CLOSE_ACCOUNT_START, closeAccount);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onEditProfileStart),
        call(onResetPasswordStart),
        call(onUpdateEmailStart),
        call(onCloseAccountStart),
    ]);
}