import { createSelector } from 'reselect';

const selectReview = state => state.review;

export const selectTargetReviewInfo = createSelector([selectReview], review => review.targetReview);

export const selectTargetReviewInfoToMap = createSelector([selectTargetReviewInfo], targetReview => {
    return Object.entries(targetReview).filter(([key, value]) => value !== null && (value.length > 0 || !isNaN(value)))
});

// Create / Update review actions

export const selectReviewToBeUpdate = createSelector([selectReview], review => review.reviewToBeUpdate);

export const selectReviewActionPending = createSelector([selectReview], review => review.reviewActionPending);

export const selectReviewCreateSuccess = createSelector([selectReview], review => review.reviewCreateSuccess);

export const selectReviewUpdateSuccess = createSelector([selectReview], review => review.reviewUpdateSuccess);

export const selectReviewActionFailure = createSelector([selectReview], review => review.reviewActionFailure);

export const selectCreateReviewErr = createSelector([selectReview], review => review.createReviewErr);

export const selectUpdateReviewErr = createSelector([selectReview], review => review.updateReviewErr);

// Request reviews

export const selectReviewsCollection = createSelector([selectReview], review => review.reviewsCollection);

export const selectUserReviews = createSelector([selectReview], review => review.userReviews);

export const selectReviewRequestPending = createSelector([selectReview], review => review.reviewRequestPending);

export const selectReviewRequestSuccess = createSelector([selectReview], review => review.reviewRequestSuccess);

export const selectRequestReviewErr = createSelector([selectReview], review => review.requestReviewErr);

export const selectReviewSortbyFilter = createSelector([selectReview], review => review.reviewSortbyFilter);