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
  console.log("workmf")

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

//POKEDEX REFERENCE..

// import { csrfFetch } from './csrf';
// import { LOAD_REVIEWS } from './reviews';

// const GET_SPOTS = 'spots/getSpots';
// const ADD_SPOT = 'spots/addSpot'
// const GET_ONE_SPOT = 'spots/getOneSpot'
// const EDIT_SPOT = 'spots/editSpot'

// const getSpots = (spots) => {
//   return {
//     type: GET_SPOTS,
//     spots
//   }
// }

// const addSpot = (spot) => {
//   return {
//     type: ADD_SPOT,
//     spot
//   }
// }
// export const editSpot = updatedSpot => ({
//   type: EDIT_SPOT,
//   updatedSpot
// });

// const getOneSpot = (spot) => {
//   return {
//     type: GET_ONE_SPOT,
//     spot
//   }
// }

// export const getSpotsThunk = () => async dispatch => {
//   const res = await fetch('/api/spots')
//   const spots = await res.json();
//   dispatch(getSpots(spots));
//   return res;
// }

// export const getFilteredSpots = (id) => async dispatch => {
//   const res = await fetch('/spots/categories/:id')
// }

// export const getOneSpotThunk = (id) => async dispatch => {
//   const res = await fetch(`/api/spots/${id}`)
//   const spot = await res.json();
//   dispatch(getOneSpot(spot))
//   return res;
// }

// export const addSpotThunk = (data) => async dispatch => {
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(data)
//   })

//   dispatch(addSpot(data))
//   return res;

// }
// export const editSpotThunk = (data) => async dispatch => {
//   console.log(data)
//   const res = await csrfFetch(`/api/spots/${data.id}`, {
//     method: 'PUT',
//     body: JSON.stringify(data)
//   })
//   const editedSpot = await res.json();
//   console.log(editedSpot)
//   dispatch(editSpot(editedSpot))
//   // dispatch(getListingsThunk(data))
//   return editedSpot;

// }




// const initialState = {};
// const spotsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_SPOTS:
//       let newState = {};
//       action.spots.forEach(spot => {
//         newState[spot.id] = spot;
//       })

//       return {
//         ...newState,

//       };
//       case LOAD_REVIEWS:
//       return {
//         ...state,
//         [action.spotId]: {
//           ...state[action.spotId],
//           reviews: action.reviews.map(review => review.id)
//         }
//       };
//       case ADD_SPOT:
//         return {
//           ...state
//         };
//       case EDIT_SPOT:
//       return {
//         ...state,
//         [action.updatedSpot.id]: {
//           ...state[action.updatedSpot.id],
//           ...action.updatedSpot
//         },
//       };

//       default:
//         return state;
//   }
// }

// export default spotsReducer;

