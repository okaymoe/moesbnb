import { ValidationError } from '../utils/validationError'
import { csrfFetch } from './csrf';
import { LOAD_REVIEWS } from './reviews';
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE = 'spots/LOAD_ONE';
const CREATE_ONE = 'spots/CREATE_ONE';
const UPDATE_ONE = 'spots/UPDATE_ONE';
const REMOVE_ONE = 'spots/REMOVE_ONE';

export const load = spots => ({
  type: LOAD_SPOTS,
  spots
});

export const loadOne = spot => ({
  type: LOAD_ONE,
  spot
});

export const createOne = newSpot => ({
  type: CREATE_ONE,
  newSpot
});

export const updateOne = updatedSpot => ({
  type: UPDATE_ONE,
  updatedSpot
});

export const removeSpot = spotToRemove => ({
  type: REMOVE_ONE,
  spotToRemove
});

export const getSpots = () => async dispatch => {
  const response = await csrfFetch(`/api/spots`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  }
};

export const getOneSpot = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));
  }
}

// SHOULD WORK BUT LEADS TO IMAGE 500 SERVER ERROR WHEN CREATING IMAGE
// export const createNewSpot = (payload) => async dispatch => {
//   const response = await csrfFetch(`/api/spots`);

//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(createOne(spot));
//     return spot;
//   }
// }

// SHOULD WORK BUT LEADS TO IMAGE 500 SERVER ERROR WHEN CREATING IMAGE
// export const createNewSpot = (payload) => async dispatch => {
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   })

//   dispatch(createOne(payload))
//   return res;
// }

//working
export const createNewSpot = (payload) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          errorJSON = JSON.parse(error);
        } catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const spot = await response.json();
    dispatch(createOne(spot));
    return spot;
  } catch (error) {
    throw error;
  }
}

export const editSpot = (payload, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateOne(updatedSpot));
    return updatedSpot
  }
}

export const deleteSpot = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const deletedSpot = await response.json();
    dispatch(removeSpot(deletedSpot));
    return deletedSpot;
  }
}

// reducer
const initialState = {};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {};
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...allSpots,
        ...state,
      };
    case LOAD_ONE:
      return {
        ...state,
        current: action.spot
      };
    case LOAD_REVIEWS:
      return {
        ...state,
        [action.spotId]: {
          ...state[action.spotId],
          reviews: action.reviews.map(review => review.id)
        }
      };
    case CREATE_ONE: {
      const newState = {...state};
      newState[action.newSpot.id] = action.newSpot;
      return newState;
      };
    case UPDATE_ONE:
      const updatedState = {
        ...state,
        [action.updatedSpot.id]: {
          ...state[action.updatedSpot.id],
          ...action.updatedSpot
        }
      }
      return updatedState;
    case REMOVE_ONE:
      const newState = {...state};
      delete newState[action.spotToRemove];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;