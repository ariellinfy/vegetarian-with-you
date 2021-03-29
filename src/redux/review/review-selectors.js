import { createSelector } from 'reselect';

const selectReview = state => state.review;

export const selectReviewAll = createSelector([selectReview], review => review.targetReview);

export const selectReviewActionPending = createSelector([selectReview], review => review.reviewActionPending);

export const selectReviewActionSuccess = createSelector([selectReview], review => review.reviewActionSuccess);

export const selectReviewActionFailure = createSelector([selectReview], review => review.reviewActionFailure);

export const selectCreateReviewErr = createSelector([selectReview], review => review.createReviewErr);

export const selectUpdateReviewErr = createSelector([selectReview], review => review.updateReviewErr);
