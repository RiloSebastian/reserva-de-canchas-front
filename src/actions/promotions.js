import PromocionService from "../services/promociones/PromocionService";
import { uploadPhotos } from "./photos";
import { CLEAN_COURTS, CREATE_COURT, RETRIEVE_PROMOTIONS } from "./types";

export const retrievePromotions = (institution_id) => async (dispatch) => {
  try {
    const res = await PromocionService.getAllByInstitutionId(institution_id);
    dispatch({
      type: RETRIEVE_PROMOTIONS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: CLEAN_COURTS,
      payload: [],
    });
    return Promise.reject(err.response);
  }
};

export const createPromo = (institution_id, data) => async (dispatch) => {
  try {
    const res = await PromocionService.create(institution_id, data);
    if (data[0].images && data[0].images.length > 0) {
      let pictures = [];
      try {
        dispatch(uploadPhotos("court", res.data[0].id, data[0].images))
          .then((data) => {
            pictures.push(...data);
            dispatch({
              type: CREATE_COURT,
              payload: { ...res.data[0], pictures },
            });
          })
          .catch();
      } catch (error) {}
    } else {
      dispatch({
        type: CREATE_PROMOTION,
        payload: res.data[0],
      });
    }

    return Promise.resolve(res.data[0]);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const updateCourt = (data) => async (dispatch) => {
  try {
    const res = await PromocionService.update(data);
    dispatch({
      type: UPDATE_PROMOTION,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const deleteCourt = (id) => async (dispatch) => {
  try {
    const res = await PromocionService.remove(id);
    dispatch({
      type: DELETE_PROMOTION,
      payload: { id },
    });
    return Promise.resolve(id);
  } catch (err) {
    return Promise.reject(err);
  }
};
