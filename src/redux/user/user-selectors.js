import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectEditEmailStatus = createSelector([selectUser], user => user.onEditUserEmail);

export const selectAdminCurrentPage = createSelector([selectUser], user => user.adminCurrentPage);

export const selectAuthPending = createSelector([selectUser], user => user.authPending);

export const selectUpdatePending = createSelector([selectUser], user => user.updatePending);

export const selectAuthSuccess = createSelector([selectUser], user => user.authSuccess);

export const selectUpdateSuccess = createSelector([selectUser], user => user.updateSuccess);

export const selectAuthFailure = createSelector([selectUser], user => user.authFailure);

export const selectUpdateFailure = createSelector([selectUser], user => user.updateFailure);

export const selectAuthErr = createSelector([selectUser], user => user.authErr);

export const selectUpdateErr = createSelector([selectUser], user => user.updateErr);
