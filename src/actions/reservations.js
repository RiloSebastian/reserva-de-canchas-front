import ReservationService from "../services/reservations/ReservationService";
import {
  CLEAN_RESERVATIONS,
  CREATE_RESERVATION,
  DELETE_RESERVATION,
  RETRIEVE_RESERVATIONS,
  UPDATE_RESERVATION,
} from "./types";

export const retrieveInstitutionReservations =
  (institution_id) => async (dispatch) => {
    try {
      const res = await ReservationService.getAllByInstitutionId(
        institution_id
      );
      dispatch({
        type: RETRIEVE_RESERVATIONS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch({
        type: CLEAN_RESERVATIONS,
        payload: [],
      });
      return Promise.reject(err.response);
    }
  };

export const retrieveCustomerReservations =
  (customer_id) => async (dispatch) => {
    try {
      const res = await ReservationService.getAllByCustomerId(customer_id);
      dispatch({
        type: RETRIEVE_RESERVATIONS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch({
        type: CLEAN_RESERVATIONS,
        payload: [],
      });
      return Promise.reject(err.response);
    }
  };

export const createReservation = (data) => async (dispatch) => {
  try {
    const res = await ReservationService.create(data);
    dispatch({
      type: CREATE_RESERVATION,
      payload: res.data[0],
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const updateReservation = (data) => async (dispatch) => {
  try {
    const res = await ReservationService.update(data);
    dispatch({
      type: UPDATE_RESERVATION,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const deleteReservation = (id) => async (dispatch) => {
  try {
    const res = await ReservationService.remove(id);
    dispatch({
      type: DELETE_RESERVATION,
      payload: { id },
    });
    return Promise.resolve(id);
  } catch (err) {
    return Promise.reject(err);
  }
};
