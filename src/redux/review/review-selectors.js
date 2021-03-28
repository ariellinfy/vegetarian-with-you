import { createSelector } from 'reselect';

const selectReviews = state => state.reviews;

export const selectReviewsAll = createSelector([selectReviews], reviews => reviews.reviews);
