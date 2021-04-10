import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectEditEmailStatus = createSelector([selectUser], user => user.onEditUserEmail);

export const selectAdminCurrentPage = createSelector([selectUser], user => user.adminCurrentPage);