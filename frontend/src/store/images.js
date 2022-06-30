import { ValidationError } from "../utils/validationError"
import { csrfFetch } from './csrf'

export const CREATE_IMAGES = 'images/CREATE_IMAGES';
export const EDIT_IMAGES = 'images/EDIT_IMAGES';

export const createImages = newImages => ({
  type: CREATE_IMAGES,
  newImages
});

export const editedImages = updatedImages => ({
  type: EDIT_IMAGES,
  updatedImages
});

export const createNewImages = (payload, id) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
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
    const images = await response.json();
    dispatch(createImages(images));
    return images;
  } catch (error) {
    throw error;
  }
}

export const editImages = (payload, id) => async dispatch => {
  // console.log('editphots: ', payload)
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
    default:
      return state;
  }
}

export default imagesReducer;