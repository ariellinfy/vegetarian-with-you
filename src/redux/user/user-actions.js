import UserActionTypes from './user-types';

// Request user info

export const requestUserStart = currentUserToken => ({
    type: UserActionTypes.REQUEST_USER_START,
    payload: currentUserToken
});

export const requestUserSuccess = user => ({
    type: UserActionTypes.REQUEST_USER_SUCCESS,
    payload: user
});

export const requestUserFailure = error => ({
    type: UserActionTypes.REQUEST_USER_FAILURE,
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

// Set email field status

export const onEditUserEmail  = () => ({
    type: UserActionTypes.CHANGE_EDIT_EMAIL_STATUS
});

export const resetEditUserEmail  = () => ({
    type: UserActionTypes.RESET_EDIT_EMAIL_STATUS
});

// Update email

export const updateEmailStart = userCredential => ({
    type: UserActionTypes.UPDATE_EMAIL_START,
    payload: userCredential
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

export const resetPasswordStart = userCredential => ({
    type: UserActionTypes.RESET_PASSWORD_START,
    payload: userCredential
});

export const resetPasswordSuccess = user => ({
    type: UserActionTypes.RESET_PASSWORD_SUCCESS,
    payload: user
});

export const resetPasswordFailure = error => ({
    type: UserActionTypes.RESET_PASSWORD_FAILURE,
    payload: error
});

// Close account

export const closeAccountStart = userCredential => ({
    type: UserActionTypes.CLOSE_ACCOUNT_START,
    payload: userCredential
});

export const closeAccountSuccess = user => ({
    type: UserActionTypes.CLOSE_ACCOUNT_SUCCESS,
    payload: user
});

export const closeAccountFailure = error => ({
    type: UserActionTypes.CLOSE_ACCOUNT_FAILURE,
    payload: error
});

// Set admin page tabs

export const setAdminCurrentPage  = pageNumber => ({
    type: UserActionTypes.SET_ADMIN_CURRENT_PAGE,
    payload: pageNumber
});

export const resetAdminCurrentPage  = () => ({
    type: UserActionTypes.RESET_ADMIN_CURRENT_PAGE,
});