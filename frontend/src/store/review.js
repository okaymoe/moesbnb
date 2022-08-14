import { csrfFetch } from './csrf';

export const SET_REVIEW = 'spot/SET_REVIEW';
export const EDIT_REVIEW = 'spot/EDIT_REVIEW';
export const DELETE_REVIEW = 'spot/DELETE_REVIEW';

export const setReview = (review) => ({
    type: SET_REVIEW,
    review
});

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
});

// THUNKS =============================================

export const createReviewThunk = (data) => async dispatch => {
  const response = await csrfFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const resData = await response.json();
    dispatch(setReview(resData));
    return resData;
  }
}

export const editReviewThunk = (data) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${data.reviewId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const resData = await response.json();
    dispatch(setReview(resData));
    return resData;
  }
}

export const deleteReviewThunk = (data) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${data.review.id}`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const resData = await response.json();
    dispatch(deleteReview(data.review));
    return resData;
  }
}
