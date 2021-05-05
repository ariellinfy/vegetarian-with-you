import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user-types';
import { 
    checkUserSessionSuccess, checkUserSessionFailure,
    refreshTokenSuccess, refreshTokenFailure,
    signUpSuccess, signUpFailure, 
    signInSuccess, signInFailure, 
    signOutSuccess, signOutFailure, 
    editProfileSuccess, editProfileFailure, 
    uploadAvatarSuccess, uploadAvatarFailure, 
    deleteAvatarSuccess, deleteAvatarFailure, 
    updateEmailSuccess, updateEmailFailure,
    resetPasswordSuccess, resetPasswordFailure, 
    closeAccountSuccess, closeAccountFailure,
} from './user-actions';

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

export function* checkUserSession({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users';
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.user) {
            yield put(checkUserSessionSuccess(data.user));
        } else {
            yield put(signOutSuccess());
            localStorage.removeItem('userToken');
            sessionStorage.removeItem('lastTimeStamp');
            yield put(checkUserSessionFailure(data.error));
        };
    } catch (error) {
        console.log('request user', error);
        yield put(checkUserSessionFailure(error));
    }
};

export function* refreshToken({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/refreshtoken';
        const method = 'GET';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.token) {
            localStorage.setItem('userToken', JSON.stringify({
                'token': data.token, 
                'exp': data.exp
            }));
            yield put(refreshTokenSuccess());
        } else {
            yield put(refreshTokenFailure(data.error));
        }
    } catch (error) {
        console.log('refresh token', error);
        yield put(refreshTokenFailure(error));
    }
};

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
        const data = yield call(request, url, method, headers, body);
        if (data.user) {
            localStorage.setItem('userToken', JSON.stringify({
                'token': data.token, 
                'exp': data.exp
            }));
            yield put(signUpSuccess(data.user));
        } else {
            yield put(signUpFailure(data.error));
        }
    } catch (error) {
        console.log('signup', error);
        yield put(signUpFailure(error));
    }
};

export function* signIn({ payload: { email, password } }) {
    try {
        const url = 'http://localhost:5000/users/signin';
        const method = 'POST';
        const headers = null;
        const body = JSON.stringify({
            email: email,
            password: password
        });
        const data = yield call(request, url, method, headers, body);
        if (data.user) {
            localStorage.setItem('userToken', JSON.stringify({
                'token': data.token, 
                'exp': data.exp
            }));
            yield put(signInSuccess(data.user));
        } else {
            yield put(signInFailure(data.error));
        }
    } catch (error) {
        console.log('signin', error);
        yield put(signInFailure(error));
    }
};

export function* signOut({ payload: { currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/signout';
        const method = 'POST';
        const headers = null;
        const body = null;
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(signOutSuccess());
            localStorage.removeItem('userToken');
            sessionStorage.removeItem('lastTimeStamp');
        } else {
            yield put(signOutFailure(data.error));
        }
    } catch (error) {
        console.log('signout', error);
        yield put(signOutFailure(error));
    }
};

export function* editProfile({ payload: { name, city, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/editprofile';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            public_name: name,
            location: city
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.user) {
            yield put(editProfileSuccess(data.user));
        } else {
            yield put(editProfileFailure(data.error));
        }
    } catch (error) {
        console.log('edit profile', error);
        yield put(editProfileFailure(error));
    }
};

export function* uploadAvatar({ payload: { compressedAvatar, currentUserToken } }) {
    try {
        const formData = new FormData();
        formData.append('avatar', compressedAvatar);
        const url = 'http://localhost:5000/users/uploadavatar';
        const response = yield call(fetch, url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentUserToken}`
            },
            body: formData
        });
        const data = yield response.json();
        if (data.user) {
            yield put(uploadAvatarSuccess(data.user));
        } else {
            yield put(uploadAvatarFailure(data.error));
        }
    } catch (error) {
        console.log('upload avatar', error);
        yield put(uploadAvatarFailure(error));
    }
};

export function* deleteAvatar({ payload: { avatar, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/deleteavatar';
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            avatar: avatar
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.user) {
            yield put(deleteAvatarSuccess(data.user));
        } else {
            yield put(deleteAvatarFailure(data.error));
        }
    } catch (error) {
        console.log('delete avatar', error);
        yield put(deleteAvatarFailure(error));
    }
};

export function* updateEmail({ payload: { email, userEmail, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/updateemail';
        const method = 'PATCH';
        const headers = null;
        const body = JSON.stringify({
            oldEmail: email,
            newEmail: userEmail
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (data.user) {
            yield put(updateEmailSuccess(data.user));
        } else {
            yield put(updateEmailFailure(data.error));
        }
    } catch (error) {
        console.log('update email', error);
        yield put(updateEmailFailure(error));
    }
};

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
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(resetPasswordSuccess());
        } else {
            yield put(resetPasswordFailure(data.error));
        }
    } catch (error) {
        console.log('reset password', error);
        yield put(resetPasswordFailure(error));
    }
};

export function* closeAccount({ payload: { email, confirmPassword, currentUserToken } }) {
    try {
        const url = 'http://localhost:5000/users/closeaccount';
        const method = 'DELETE';
        const headers = null;
        const body = JSON.stringify({
            email: email,
            password: confirmPassword
        });
        const data = yield call(request, url, method, headers, body, currentUserToken);
        if (!data.error) {
            yield put(closeAccountSuccess());
            localStorage.removeItem('userToken');
            sessionStorage.removeItem('lastTimeStamp');
        } else {
            yield put(closeAccountFailure(data.error));
        }
    } catch (error) {
        console.log('close account', error);
        yield put(closeAccountFailure(error));
    }
};

export function* onCheckUserSessionStart() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, checkUserSession);
};

export function* onRefreshTokenStart() {
    yield takeLatest(UserActionTypes.REFRESH_TOKEN_START, refreshToken);
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
};

export function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};

export function* onEditProfileStart() {
    yield takeLatest(UserActionTypes.EDIT_PROFILE_START, editProfile);
};

export function* onUploadAvatarStart() {
    yield takeLatest(UserActionTypes.UPLOAD_AVATAR_START, uploadAvatar);
};

export function* onDeleteAvatarStart() {
    yield takeLatest(UserActionTypes.DELETE_AVATAR_START, deleteAvatar);
};

export function* onUpdateEmailStart() {
    yield takeLatest(UserActionTypes.UPDATE_EMAIL_START, updateEmail);
};

export function* onResetPasswordStart() {
    yield takeLatest(UserActionTypes.RESET_PASSWORD_START, resetPassword);
};

export function* onCloseAccountStart() {
    yield takeLatest(UserActionTypes.CLOSE_ACCOUNT_START, closeAccount);
};

export function* userSagas() {
    yield all([
        call(onCheckUserSessionStart),
        call(onRefreshTokenStart),
        call(onSignUpStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onEditProfileStart),
        call(onUploadAvatarStart),
        call(onDeleteAvatarStart),
        call(onUpdateEmailStart),
        call(onResetPasswordStart),
        call(onCloseAccountStart),
    ]);
};