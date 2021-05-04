import UserActionTypes from './user-types';

// Request user info

export const checkUserSessionStart = token => ({
    type: UserActionTypes.CHECK_USER_SESSION_START,
    payload: token
});

export const checkUserSessionSuccess = user => ({
    type: UserActionTypes.CHECK_USER_SESSION_SUCCESS,
    payload: user
});

export const checkUserSessionFailure = error => ({
    type: UserActionTypes.CHECK_USER_SESSION_FAILURE,
    payload: error
});

// Refresh token

export const refreshTokenStart = token => ({
    type: UserActionTypes.REFRESH_TOKEN_START,
    payload: token
});

export const refreshTokenSuccess = () => ({
    type: UserActionTypes.REFRESH_TOKEN_SUCCESS,
});

export const refreshTokenFailure = error => ({
    type: UserActionTypes.REFRESH_TOKEN_FAILURE,
    payload: error
});

// Sign up

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

// Sign in

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

// Sign out

export const signOutStart = token => ({
    type: UserActionTypes.SIGN_OUT_START,
    payload: token
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

// Reset auth status

export const resetAuthStatus = () => ({
    type: UserActionTypes.RESET_AUTH_STATUS,
});

// Edit profile

export const editProfileStart = userInfo => ({
    type: UserActionTypes.EDIT_PROFILE_START,
    payload: userInfo
});

export const editProfileSuccess = user => ({
    type: UserActionTypes.EDIT_PROFILE_SUCCESS,
    payload: user
});

export const editProfileFailure = error => ({
    type: UserActionTypes.EDIT_PROFILE_FAILURE,
    payload: error
});

// Upload avatar

export const uploadAvatarStart = userInfo => ({
    type: UserActionTypes.UPLOAD_AVATAR_START,
    payload: userInfo
});

export const uploadAvatarSuccess = user => ({
    type: UserActionTypes.UPLOAD_AVATAR_SUCCESS,
    payload: user
});

export const uploadAvatarFailure = error => ({
    type: UserActionTypes.UPLOAD_AVATAR_FAILURE,
    payload: error
});

// Delete avatar

export const deleteAvatarStart = userInfo => ({
    type: UserActionTypes.DELETE_AVATAR_START,
    payload: userInfo
});

export const deleteAvatarSuccess = user => ({
    type: UserActionTypes.DELETE_AVATAR_SUCCESS,
    payload: user
});

export const deleteAvatarFailure = error => ({
    type: UserActionTypes.DELETE_AVATAR_FAILURE,
    payload: error
});

// Update email

export const updateEmailStart = userInfo => ({
    type: UserActionTypes.UPDATE_EMAIL_START,
    payload: userInfo
});

export const updateEmailSuccess = user => ({
    type: UserActionTypes.UPDATE_EMAIL_SUCCESS,
    payload: user
});

export const updateEmailFailure = error => ({
    type: UserActionTypes.UPDATE_EMAIL_FAILURE,
    payload: error
});

// Reset password

export const resetPasswordStart = userInfo => ({
    type: UserActionTypes.RESET_PASSWORD_START,
    payload: userInfo
});

export const resetPasswordSuccess = () => ({
    type: UserActionTypes.RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = error => ({
    type: UserActionTypes.RESET_PASSWORD_FAILURE,
    payload: error
});

// Close account

export const closeAccountStart = userInfo => ({
    type: UserActionTypes.CLOSE_ACCOUNT_START,
    payload: userInfo
});

export const closeAccountSuccess = () => ({
    type: UserActionTypes.CLOSE_ACCOUNT_SUCCESS,
});

export const closeAccountFailure = error => ({
    type: UserActionTypes.CLOSE_ACCOUNT_FAILURE,
    payload: error
});

// Reset update status

export const resetUserUpdateStatus = () => ({
    type: UserActionTypes.RESET_USER_UPDATE_STATUS,
});

// Set email field status

export const onEditUserEmail  = () => ({
    type: UserActionTypes.CHANGE_EDIT_EMAIL_STATUS
});

// Set admin page tabs

export const setAdminCurrentPage  = pageNumber => ({
    type: UserActionTypes.SET_ADMIN_CURRENT_PAGE,
    payload: pageNumber
});

export const resetAdminCurrentPage  = () => ({
    type: UserActionTypes.RESET_ADMIN_CURRENT_PAGE,
});