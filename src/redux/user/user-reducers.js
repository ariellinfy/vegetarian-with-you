import UserActionTypes from './user-types';

const INITIAL_STATE = {
    currentUser: {},
    authErr: '',
    editProfileErr: '',
    uploadAvatarErr: '',
    deleteErr: '',
    onEditUserEmail: false,
    adminCurrentPage: 0
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_UP_SUCCESS:
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                authErr: ''
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                authErr: ''
            };
        case UserActionTypes.EDIT_PROFILE_SUCCESS:
        case UserActionTypes.RESET_PASSWORD_SUCCESS:
        case UserActionTypes.UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                editProfileErr: ''
            };
        case UserActionTypes.CLOSE_ACCOUNT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                deleteErr: '',
            };
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                authErr: action.payload
            };
        case UserActionTypes.EDIT_PROFILE_FAILURE:
        case UserActionTypes.RESET_PASSWORD_FAILURE:
        case UserActionTypes.UPDATE_EMAIL_FAILURE:
            return {
                ...state,
                editProfileErr: action.payload
            };
        case UserActionTypes.CLOSE_ACCOUNT_FAILURE:
            return {
                ...state,
                deleteErr: action.payload
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
}

export default userReducer;