import { csrfFetch } from './csrf';

// Review Actions
import {
  SET_REVIEW,
  DELETE_REVIEW
} from './review.js';

// Booking Actions
import {
  SET_BOOKING,
} from './booking.js'

// Spot Actions
const SET_SPOT = 'spot/SET_SPOT';
const LOAD_SPOT = 'spot/LOAD_SPOT';
const LOAD_ALL_SPOT = 'spot/LOAD_ALL_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
const DELETE_SPOT = 'spot/DELETE_SPOT';

const setSpot = (spot, imgArr) => ({
  type: SET_SPOT,
  spot,
  imgArr
});

const loadSpot = (spot, images, reviews, bookings) => ({
  type: LOAD_SPOT,
  spot,
  images,
  reviews,
  bookings
});

const loadAllSpots = (data) => ({
  type: LOAD_ALL_SPOT,
  data,
});

const updateSpot = (spot, imgArr) => ({
  type: UPDATE_SPOT,
  spot,
  imgArr
});

const deleteSpot = () => ({
  type: DELETE_SPOT,
});


// THUNKS =============================================

export const create = (spot) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSpot(data.spot, data.imgArr));
    return data;
  }
}

export const getSpotDetail = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpot(data.spot, data.images, data.reviews, data.bookings));
    return data;
  }
}

export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch(`/api/spots/all`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAllSpots(data));
    return data;
  }
}

export const update = (spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PATCH",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpot(data.spot, data.imgArr));
    return data;
  }
}

export const deleteSpotThunk = (data) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${data.spot.id}`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const resData = await response.json();
    dispatch(deleteSpot());
    return resData;
  }
}

const initialState = { };

const spotReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_SPOT: {
      newState = { ...state }
      const imgObj = {};
      action.imgArr.forEach(img => {
        imgObj[img.id] = {
          url: img.url
        }
      });

      newState.id = action.spot.id;
      newState.data = {
          userId: action.spot.userId,
          price: action.spot.price,
          name: action.spot.name,
          address: action.spot.address,
          city: action.spot.city,
          state: action.spot.state,
          country: action.spot.country
      };
      newState.bookings = {};
      newState.images = imgObj;
      newState.reviews = {};
      return newState;
    }
    case LOAD_SPOT: {
      const imgObj = {};
      action.images.forEach(img => {
        imgObj[img.id] = {
          url: img.url
        }
      });
      const reviewObj = {};
      action.reviews.forEach(review => {
        reviewObj[review.userId] = {
          id: review.id,
          userId: review.userId,
          description: review.description,
          rating: review.rating
        }
      });
      const bookingObj = {};
      action.bookings.forEach(booking => {
        bookingObj[booking.userId] = booking.userId
      })
      return {
        data: {
          ...action.spot
        },
        bookings: bookingObj,
        images: imgObj,
        reviews: reviewObj,
      };
    }
    case LOAD_ALL_SPOT: {
      const newState = {};
      action.data.forEach(spot => {
        const imgObj = {};
        spot.Images.forEach((img, i) => {
          imgObj[i] = img.url;
        });
        let avgRating = "New";
        if (spot.Reviews.length) {
          const sum = (Object.values(spot.Reviews).reduce((prev, curr) => prev + curr.rating, 0));
          const avg = sum / Object.values(spot.Reviews).length
          avgRating = (Math.round(avg*100)/100).toFixed(1);
        }
        newState[spot.id] = {
          id: spot.id,
          name: spot.name,
          price: spot.price,
          avgRating,
          images: imgObj
        }
      });
      return newState;
    }
    case UPDATE_SPOT: {
      const imgObj = {};
      action.imgArr.forEach(img => {
        imgObj[img.id] = {
          url: img.url
        }
      });

      return {
        data: {
          ...action.spot
        },
        images: imgObj,
        reviews: {
          ...state.reviews
        }
      }
    }
    case DELETE_SPOT: {
      return {};
    }
    case SET_REVIEW: {
      newState = { ...state }
      newState.reviews[action.review.userId] = {
        id: action.review.id,
        userId: action.review.userId,
        description: action.review.description,
        rating: action.review.rating,
      }
      return newState;
    }
    case DELETE_REVIEW: {
      newState = { ...state }
      newState.reviews[action.review.userId] = {}
      return newState;
    }
    case SET_BOOKING: {
      newState = { ...state }
      newState.bookings[action.booking.userId] = action.booking.userId
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
