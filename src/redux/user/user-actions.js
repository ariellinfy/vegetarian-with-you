import UserActionTypes from './user-types';

export const signUpStart = userCredential => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredential
});

export const signUpSuccess = user => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const signInStart = userCredential => ({
    type: UserActionTypes.SIGN_IN_START,
    payload: userCredential
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const signOutStart = user => ({
    type: UserActionTypes.SIGN_OUT_START,
    payload: user
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});