import { createSelector } from 'reselect';

const selectReview = state => state.review;

export const selectReviewAll = createSelector([selectReview], review => review.targetReview);
