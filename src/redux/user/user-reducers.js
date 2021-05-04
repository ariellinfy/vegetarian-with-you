import UserActionTypes from './user-types';

const INITIAL_STATE = {
    currentUser: {},
    authPending: false,
    authErr: '',
    refreshTokenPending: false,
    refreshTokenErr: '',
    signUpPending: false,
    signUpErr: '',
    signInPending: false,
    signInErr: '',
    signOutPending: false,
    signOutErr: '',
    authSuccess: false,
    editProfilePending: false,
    editProfileErr: '',
    updateAvatarPending: false,
    updateAvatarErr: '',
    updateEmailPending: false,
    updateEmailErr: '',
    resetPasswordPending: false,
    resetPasswordErr: '',
    closeAccountPending: false,
    closeAccountErr: '',
    updateSuccess: false,
    onEditUserEmail: false,
    adminCurrentPage: 0
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // request user
        case UserActionTypes.CHECK_USER_SESSION_START:
            return {
                ...state,
                authPending: true,
                authSuccess: false,
                authErr: '',
            };
        case UserActionTypes.CHECK_USER_SESSION_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                authPending: false,
                authSuccess: true,
                authErr: ''
            };
        case UserActionTypes.CHECK_USER_SESSION_FAILURE:
            return {
                ...state,
                authPending: false,
                authSuccess: false,
                authErr: action.payload
            };
        // refresh token
        case UserActionTypes.REFRESH_TOKEN_START:
            return {
                ...state,
                refreshTokenPending: true,
                authSuccess: false,
                refreshTokenErr: '',
            };
        case UserActionTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                refreshTokenPending: false,
                authSuccess: true,
                refreshTokenErr: ''
            };
        case UserActionTypes.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                refreshTokenPending: false,
                authSuccess: false,
                refreshTokenErr: action.payload
            };
        // sign up
        case UserActionTypes.SIGN_UP_START:
            return {
                ...state,
                signUpPending: true,
                authSuccess: false,
                signUpErr: '',
            };
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                signUpPending: false,
                authSuccess: true,
                signUpErr: ''
            };
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                signUpPending: false,
                authSuccess: false,
                signUpErr: action.payload
            };
        // sign in
        case UserActionTypes.SIGN_IN_START:
            return {
                ...state,
                signInPending: true,
                authSuccess: false,
                signInErr: '',
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                signInPending: false,
                authSuccess: true,
                signInErr: ''
            };
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                signInPending: false,
                authSuccess: false,
                signInErr: action.payload
            };
        // sign out   
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                signOutPending: true,
                authSuccess: false,
                signOutErr: '',
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                signOutPending: false,
                authSuccess: true,
                signOutErr: ''
            };
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                signOutPending: false,
                authSuccess: false,
                signOutErr: action.payload
            };
        // reset auth status
        case UserActionTypes.RESET_AUTH_STATUS:
            return {
                ...state,
                authPending: false,
                authErr: '',
                refreshTokenPending: false,
                refreshTokenErr: '',
                signUpPending: false,
                signUpErr: '',
                signInPending: false,
                signInErr: '',
                signOutPending: false,
                signOutErr: '',
            };
        // edit profile
        case UserActionTypes.EDIT_PROFILE_START:
            return {
                ...state,
                editProfilePending: true,
                updateSuccess: false,
                editProfileErr: '',
            };
        case UserActionTypes.EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                editProfilePending: false,
                updateSuccess: true,
                editProfileErr: '',
            };
        case UserActionTypes.EDIT_PROFILE_FAILURE:
            return {
                ...state,
                editProfilePending: false,
                updateSuccess: false,
                editProfileErr: action.payload
            };
        //  update avatar
        case UserActionTypes.UPLOAD_AVATAR_START:
        case UserActionTypes.DELETE_AVATAR_START:
            return {
                ...state,
                updateAvatarPending: true,
                updateSuccess: false,
                updateAvatarErr: '',
            };
        case UserActionTypes.UPLOAD_AVATAR_SUCCESS:
        case UserActionTypes.DELETE_AVATAR_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                updateAvatarPending: false,
                updateSuccess: true,
                updateAvatarErr: '',
            };
        case UserActionTypes.UPLOAD_AVATAR_FAILURE:
        case UserActionTypes.DELETE_AVATAR_FAILURE:
            return {
                ...state,
                updateAvatarPending: false,
                updateSuccess: false,
                updateAvatarErr: action.payload
            };
        // update email
        case UserActionTypes.UPDATE_EMAIL_START:
            return {
                ...state,
                updateEmailPending: true,
                updateSuccess: false,
                updateEmailErr: '',
            };
        case UserActionTypes.UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                updateEmailPending: false,
                updateSuccess: true,
                updateEmailErr: '',
            };
        case UserActionTypes.UPDATE_EMAIL_FAILURE:
            return {
                ...state,
                updateEmailPending: false,
                updateSuccess: false,
                updateEmailErr: action.payload
            }; 
        // reset password
        case UserActionTypes.RESET_PASSWORD_START:
            return {
                ...state,
                resetPasswordPending: true,
                updateSuccess: false,
                resetPasswordErr: '',
            };
        case UserActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordPending: false,
                updateSuccess: true,
                resetPasswordErr: '',
            };
        case UserActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                resetPasswordPending: false,
                updateSuccess: false,
                resetPasswordErr: action.payload
            };  
        // close account
        case UserActionTypes.CLOSE_ACCOUNT_START:
            return {
                ...state,
                closeAccountPending: true,
                updateSuccess: false,
                closeAccountErr: '',
            };
        case UserActionTypes.CLOSE_ACCOUNT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                closeAccountPending: false,
                updateSuccess: true,
                closeAccountErr: '',
            };
        case UserActionTypes.CLOSE_ACCOUNT_FAILURE:
            return {
                ...state,
                closeAccountPending: false,
                updateSuccess: false,
                closeAccountErr: action.payload
            };
        // reset user update status
        case UserActionTypes.RESET_USER_UPDATE_STATUS:
            return {
                ...state,
                editProfilePending: false,
                editProfileErr: '',
                updateAvatarPending: false,
                updateAvatarErr: '',
                updateEmailPending: false,
                updateEmailErr: '',
                resetPasswordPending: false,
                resetPasswordErr: '',
                closeAccountPending: false,
                closeAccountErr: '',
                updateSuccess: false,
                onEditUserEmail: false,
            };
        // update edit email status
        case UserActionTypes.CHANGE_EDIT_EMAIL_STATUS:
            return {
                ...state,
                onEditUserEmail: !state.onEditUserEmail
            };
        // set admin page
        case UserActionTypes.SET_ADMIN_CURRENT_PAGE:
            return {
                ...state,
                adminCurrentPage: action.payload
            };
        case UserActionTypes.RESET_ADMIN_CURRENT_PAGE:
            return {
                ...state,
                adminCurrentPage: 0
            };

        default:
            return state;
    }
};

export default userReducer;