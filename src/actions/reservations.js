import court from "../reducers/court";
import ReservationService from "../services/reservations/ReservationService";
import {
  CLEAN_RESERVATIONS,
  CREATE_RESERVATION,
  DELETE_RESERVATION,
  RETRIEVE_RESERVATIONS,
  UPDATE_RESERVATION,
  CANCEL_RESERVATION,
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
      /*  dispatch({
        type: CLEAN_RESERVATIONS,
        payload: [],
      }); */
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

export const createReservation =
  (institution, courtName, appointmentData) => async (dispatch) => {
    try {
      const reservationData = {
        reservedFor: {
          firstName: appointmentData.text,
          email: appointmentData.email,
        },
        institutionId: institution.id,
        institutionName: institution.name,
        courtId: appointmentData.courtId,
        courtName,
        durationRange: {
          from: appointmentData.startDate,
          to: appointmentData.endDate,
        },
        paymentMethod: "CREDITO",
      };

      const res = await ReservationService.create(reservationData);
      dispatch({
        type: CREATE_RESERVATION,
        payload: { ...appointmentData, ...res.data },
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const updateReservation =
  (institutionId, appointmentData) => async (dispatch) => {
    try {
      const reservationData = {
        //id: appointmentData.id,
        id: appointmentData.id,
        reservedFor: {
          firstName: appointmentData.text,
          email: appointmentData.email,
        },
        institutionId,
        courtId: appointmentData.courtId,
        durationRange: {
          from: appointmentData.startDate,
          to: appointmentData.endDate,
        },
        paymentMethod: "CREDITO",
      };

      const res = await ReservationService.update(reservationData);
      dispatch({
        type: CANCEL_RESERVATION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const cancelReservation = (id, client_choice) => async (dispatch) => {
  try {
    const res = await ReservationService.cancel(id, client_choice);
    dispatch({
      type: CANCEL_RESERVATION,
      payload: id,
    });
    return Promise.resolve(id);
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: CANCEL_RESERVATION,
        payload: id,
      });
    }
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
