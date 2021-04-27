import UserActionTypes from './user-types';

const INITIAL_STATE = {
    currentUser: {},
    authPending: false,
    editProfilePending: false,
    updateAvatarPending: false,
    updateEmailPending: false,
    resetPasswordPending: false,
    closeAccountPending: false,
    authSuccess: false,
    updateSuccess: false,
    authFailure: false,
    updateFailure: false,
    authErr: '',
    updateErr: '',
    onEditUserEmail: false,
    adminCurrentPage: 0
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.REQUEST_USER_START:
        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                authPending: true,
                authSuccess: false,
                authFailure: false,
                authErr: '',
            };
        case UserActionTypes.REQUEST_USER_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                authPending: false,
                authSuccess: true,
                authFailure: false,
                authErr: ''
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                authPending: false,
                authSuccess: true,
                authFailure: false,
                authErr: ''
            };
        case UserActionTypes.REQUEST_USER_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                authPending: false,
                authSuccess: false,
                authFailure: true,
                authErr: action.payload
            };

        case UserActionTypes.EDIT_PROFILE_START:
            return {
                ...state,
                editProfilePending: true,
                updateSuccess: false,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.UPDATE_EMAIL_START:
            return {
                ...state,
                updateEmailPending: true,
                updateSuccess: false,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.RESET_PASSWORD_START:
            return {
                ...state,
                resetPasswordPending: true,
                updateSuccess: false,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.UPLOAD_AVATAR_START:
        case UserActionTypes.DELETE_AVATAR_START:
            return {
                ...state,
                updateAvatarPending: true,
                updateSuccess: false,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.CLOSE_ACCOUNT_START:
            return {
                ...state,
                closeAccountPending: true,
                updateSuccess: false,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.EDIT_PROFILE_SUCCESS:
        case UserActionTypes.UPDATE_EMAIL_SUCCESS:
        case UserActionTypes.RESET_PASSWORD_SUCCESS:
        case UserActionTypes.UPLOAD_AVATAR_SUCCESS:
        case UserActionTypes.DELETE_AVATAR_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                editProfilePending: false,
                updateAvatarPending: false,
                updateEmailPending: false,
                resetPasswordPending: false,
                updateSuccess: true,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.CLOSE_ACCOUNT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                closeAccountPending: false,
                updateSuccess: true,
                updateFailure: false,
                updateErr: '',
            };
        case UserActionTypes.EDIT_PROFILE_FAILURE:
        case UserActionTypes.UPDATE_EMAIL_FAILURE:
        case UserActionTypes.RESET_PASSWORD_FAILURE:
        case UserActionTypes.UPLOAD_AVATAR_FAILURE:
        case UserActionTypes.DELETE_AVATAR_FAILURE:
        case UserActionTypes.CLOSE_ACCOUNT_FAILURE:
            return {
                ...state,
                editProfilePending: false,
                updateAvatarPending: false,
                updateEmailPending: false,
                resetPasswordPending: false,
                closeAccountPending: false,
                updateSuccess: false,
                updateFailure: true,
                updateErr: action.payload
            };

        case UserActionTypes.CHANGE_EDIT_EMAIL_STATUS:
            return {
                ...state,
                onEditUserEmail: !state.onEditUserEmail
            };
        case UserActionTypes.RESET_EDIT_EMAIL_STATUS:
            return {
                ...state,
                onEditUserEmail: false
            };
            
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