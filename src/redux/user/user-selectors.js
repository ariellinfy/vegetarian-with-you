import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectEditEmailStatus = createSelector([selectUser], user => user.onEditUserEmail);

export const selectAdminCurrentPage = createSelector([selectUser], user => user.adminCurrentPage);


export const selectAuthPending = createSelector([selectUser], user => user.authPending);
export const selectAuthErr = createSelector([selectUser], user => user.authErr);

export const selectRefreshTokenPending = createSelector([selectUser], user => user.refreshTokenPending);
export const selectRefreshTokenErr = createSelector([selectUser], user => user.refreshTokenErr);

export const selectSignUpPending = createSelector([selectUser], user => user.signUpPending);
export const selectSignUpErr = createSelector([selectUser], user => user.signUpErr);

export const selectSignInPending = createSelector([selectUser], user => user.signInPending);
export const selectSignInErr = createSelector([selectUser], user => user.signInErr);

export const selectSignOutPending = createSelector([selectUser], user => user.signOutPending);
export const selectSignOutErr = createSelector([selectUser], user => user.signOutErr);

export const selectAuthSuccess = createSelector([selectUser], user => user.authSuccess);


export const selectEditProfilePending = createSelector([selectUser], user => user.editProfilePending);
export const selectEditProfileErr = createSelector([selectUser], user => user.editProfileErr);

export const selectUpdateAvatarPending = createSelector([selectUser], user => user.updateAvatarPending);
export const selectUpdateAvatarErr = createSelector([selectUser], user => user.updateAvatarErr);

export const selectUpdateEmailPending = createSelector([selectUser], user => user.updateEmailPending);
export const selectUpdateEmailErr = createSelector([selectUser], user => user.updateEmailErr);

export const selectResetPasswordPending = createSelector([selectUser], user => user.resetPasswordPending);
export const selectResetPasswordErr = createSelector([selectUser], user => user.resetPasswordErr);

export const selectCloseAccountPending = createSelector([selectUser], user => user.closeAccountPending);
export const selectCloseAccountErr = createSelector([selectUser], user => user.closeAccountErr);

export const selectUpdateSuccess = createSelector([selectUser], user => user.updateSuccess);



