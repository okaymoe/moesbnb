import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";


const load = (reviews, id) => ({
  type: LOAD_REVIEWS,
  reviews,
  id
});

const update = (review) => ({
  type: UPDATE_REVIEW,
  review
});

const add = (review) => ({
  type: ADD_REVIEW,
  review
});

const remove = (reviewId, spotId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  spotId
});


export const getReviews = (id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}`)
  if(res.ok){
    const reviews = await res.json();
    dispatch(load(reviews, id))
    return reviews;
  }
}

export const createReview = (data) => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/${data.id}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

    const newReview = await response.json()
    console.log(newReview);
    dispatch(add(newReview))
    return newReview
}

export const deleteReview = (reviewId, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${spotId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const { id: deletedReviewId } = await response.json();
    dispatch(remove(deletedReviewId, spotId));

  }
};

const initialState = {};
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_REVIEWS:
      const newReviews = {};
      action.reviews.forEach(review => {
        newReviews[review.id] = review;
      })
      return {
        ...state,
        ...newReviews
      }

    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;

    case ADD_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
      
    case UPDATE_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
    default:
      return state;
  }
};
export default reviewsReducer;