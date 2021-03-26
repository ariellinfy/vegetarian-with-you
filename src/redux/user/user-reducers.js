import UserActionTypes from './user-types';

const INITIAL_STATE = {
    currentUser: { user: {}, token: '' },
    authErr: '',
    editProfileErr: '',
    onEditUserEmail: false,
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
                currentUser: { user: {}, token: '' },
                authErr: null
            };
        case UserActionTypes.EDIT_PROFILE_SUCCESS:
        case UserActionTypes.RESET_PASSWORD_SUCCESS:
        case UserActionTypes.UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                editProfileErr: null
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
        case UserActionTypes.CHANGE_EDIT_EMAIL_STATUS:
            return {
                ...state,
                onEditUserEmail: !state.onEditUserEmail
            }
        default:
            return state;
    }
}

export default userReducer;