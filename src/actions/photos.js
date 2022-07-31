import PhotoService from "../services/photos/PhotoService";
import {
  UPLOAD_COURT_PHOTOS,
  UPLOAD_USER_PHOTOS,
  UPLOAD_INSTITUTION_PHOTOS,
} from "./types";

export const uploadPhotos = (entity, entity_id, data) => async (dispatch) => {
  try {
    const res = await PhotoService.upload(entity, entity_id, data);
    let type = "";
    switch (entity) {
      case "user":
        type = UPLOAD_USER_PHOTOS;
        break;

      case "court":
        type = UPLOAD_COURT_PHOTOS;
        break;

      case "institution":
        type = UPLOAD_INSTITUTION_PHOTOS;
        break;

      default:
        break;
    }

    dispatch({
      type,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};
