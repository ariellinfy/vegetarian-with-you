const UserActionTypes = {
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',

    SIGN_UP_START: 'SIGN_UP_START',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',

    SIGN_IN_START: 'SIGN_IN_START',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

    SIGN_OUT_START: 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',

    EDIT_PROFILE_START: 'EDIT_PROFILE_START',
    EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
    EDIT_PROFILE_FAILURE: 'EDIT_PROFILE_FAILURE',

    UPLOAD_AVATAR_START: 'UPLOAD_AVATAR_START',
    UPLOAD_AVATAR_SUCCESS: 'UPLOAD_AVATAR_SUCCESS',
    UPLOAD_AVATAR_FAILURE: 'UPLOAD_AVATAR_FAILURE',

    SET_AVATAR_URL: 'SET_AVATAR_URL',
    RESET_AVATAR_URL: 'RESET_AVATAR_URL',

    DELETE_AVATAR_START: 'DELETE_AVATAR_START',
    DELETE_AVATAR_SUCCESS: 'DELETE_AVATAR_SUCCESS',
    DELETE_AVATAR_FAILURE: 'DELETE_AVATAR_FAILURE',

    RESET_PASSWORD_START: 'RESET_PASSWORD_START',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',

    CHANGE_EDIT_EMAIL_STATUS: 'CHANGE_EDIT_EMAIL_STATUS',
    RESET_EDIT_EMAIL_STATUS: 'RESET_EDIT_EMAIL_STATUS',

    UPDATE_EMAIL_START: 'UPDATE_EMAIL_START',
    UPDATE_EMAIL_SUCCESS: 'UPDATE_EMAIL_SUCCESS',
    UPDATE_EMAIL_FAILURE: 'UPDATE_EMAIL_FAILURE',
    
    CLOSE_ACCOUNT_START: 'CLOSE_ACCOUNT_START',
    CLOSE_ACCOUNT_SUCCESS: 'CLOSE_ACCOUNT_SUCCESS',
    CLOSE_ACCOUNT_FAILURE: 'CLOSE_ACCOUNT_FAILURE',

    SET_ADMIN_CURRENT_PAGE: 'SET_ADMIN_CURRENT_PAGE',
    RESET_ADMIN_CURRENT_PAGE: 'RESET_ADMIN_CURRENT_PAGE',
};

export default UserActionTypes;