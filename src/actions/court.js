import CanchaService from "../services/canchas/CanchaService";
import { uploadPhotos } from "./photos";
import {
  RETRIEVE_COURTS,
  CREATE_COURT,
  UPDATE_COURT,
  DELETE_COURT,
  CLEAN_COURTS,
  UPDATE_COURT_SCHEDULES,
} from "./types";
import { useSelector } from "react-redux";

export const retrieveCourts = (institution_id) => async (dispatch) => {
  try {
    const res = await CanchaService.getAll(institution_id);
    dispatch({
      type: RETRIEVE_COURTS,
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

export const createCourt = (institution_id, data) => async (dispatch) => {
  try {
    const res = await CanchaService.create(institution_id, data);
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
        type: CREATE_COURT,
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
    const res = await CanchaService.update(data);
    dispatch({
      type: UPDATE_COURT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const deleteCourt = (id) => async (dispatch) => {
  try {
    const res = await CanchaService.remove(id);
    dispatch({
      type: DELETE_COURT,
      payload: { id },
    });
    return Promise.resolve(id);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const setCourtSchedules =
  (court_id, data, force) => async (dispatch) => {
    try {
      const res = await CanchaService.setCourtSchedules(court_id, data, force);

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };
