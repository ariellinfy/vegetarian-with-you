import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUserAll = createSelector([selectUser], user => user.currentUser);

export const selectCurrentUser = createSelector([selectUser], user => {
    if (user.currentUser) {
        return user.currentUser.user;
    } else {
        return {};
    }
});

export const selectUserToken = createSelector([selectUser], user => {
    if (user.currentUser) {
        return user.currentUser.token;
    } else {
        return "";
    }
});