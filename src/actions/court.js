import CanchaService from "../services/canchas/CanchaService";
import {
  RETRIEVE_COURTS,
  CREATE_COURT,
  UPDATE_COURT,
  DELETE_COURT,
  CLEAN_COURTS,
} from "./types";

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
    return Promise.reject(err);
  }
};

export const createCourt = (institution_id, data) => async (dispatch) => {
  try {
    const res = await CanchaService.create(institution_id, data);
    dispatch({
      type: CREATE_COURT,
      payload: res.data[0],
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
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
