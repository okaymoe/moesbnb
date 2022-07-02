import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf'

export const CREATE_IMAGES = 'images/CREATE_IMAGES';
export const EDIT_IMAGES = 'images/EDIT_IMAGES';
export const GET_IMAGES = 'images/GET_IMAGES';


export const createImages = newImages => ({
  type: CREATE_IMAGES,
  newImages
});

export const getImages = images => ({
  type: GET_IMAGES,
  images
});

export const editedImages = updatedImages => ({
  type: EDIT_IMAGES,
  updatedImages
});




export const createNewImages = (newImages, id) => async dispatch => {

  const response = await csrfFetch(`/api/images/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newImages)
  });

  if (response.ok) {

    const images = await response.json();
    console.log("Images from response", images)
    dispatch(createImages(images));
    return images;
  }
}

export const getAllImages = spotId => async dispatch => {
  console.log(spotId, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  const response = await csrfFetch(`/api/images/${spotId}`, {
    method: 'GET',
  });
  if (response.ok) {
    const images = await response.json();
    dispatch(getImages(images))
    return images;
  }
}

export const editImages = (payload, id) => async dispatch => {
  
  const response = await csrfFetch(`/api/spots/${id}/images`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedImages = await response.json();
    dispatch(editedImages(updatedImages));
    return updatedImages
  }
}

const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_IMAGES:
      const allImages = {}
      action.newImages.forEach(newImage => {
        allImages[newImage.id] = newImage;
      });
      console.log("this is all the images", allImages)
      console.log("this is the action", action)
      return {
        ...allImages,
        ...state
      };
    case EDIT_IMAGES:

      const editedImages = {}
      action.updatedImages.forEach(updatedImage => {
        editedImages[updatedImage.id] = updatedImage
      });
      return {
        ...editedImages,
        ...state
      };
    case GET_IMAGES:

      const getImages = {}
      action.images.forEach(image => {
        getImages[image.id] = image
      });
      return {
        ...getImages,
        ...state
      };
    default:
      return state;
  }
}

export default imagesReducer;