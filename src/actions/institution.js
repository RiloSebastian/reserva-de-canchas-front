import {
  DELETE_INSTITUTION_SCHEDULES,
  GET_INSTITUTION,
  GET_INSTITUTION_FAILED,
  LOAD_INSTITUTION_ADVANCE_PAYMENT,
  LOAD_INSTITUTION_DAYSOFF,
  LOAD_INSTITUTION_SCHEDULES,
  RETRIEVE_INSTITUTION,
  UPDATE_INSTITUTION,
} from "./types";

import InstitucionService from "../services/instituciones/InstitucionService";

export const getByAdminEmail = (admin_email) => (dispatch) => {
  return InstitucionService.getByAdminEmail(admin_email).then(
    (response) => {
      console.log("ejecutando action para obtener datos de la institucion");
      console.log(response);

      dispatch({
        type: GET_INSTITUTION,
        payload: response,
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_INSTITUTION_FAILED,
      });

      return Promise.reject();
    }
  );
};

export const getInstitutionSchedules = (institution_id) => (dispatch) => {
  return InstitucionService.getInstitutionSchedules(institution_id).then(
    (response) => {
      console.log("ejecutando action para obtener horarios de la institucion");
      console.log(response);

      //TRAIGO LOS HORARIOS DE LA INSTITUCION

      dispatch({
        type: LOAD_INSTITUTION_SCHEDULES,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(
        "ERROR -> ejecutando action para obtener horarios de la institucion"
      );
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_INSTITUTION_FAILED,
      });

      return Promise.reject();
    }
  );
};

export const updateInstitutionDetails =
  (institution_id, data) => async (dispatch) => {
    try {
      const res = await InstitucionService.update(institution_id, data);
      dispatch({
        type: UPDATE_INSTITUTION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const uploadNonWorkingDays =
  (institution_id, data, force) => async (dispatch) => {
    try {
      const res = await InstitucionService.uploadNonWorkingDays(
        institution_id,
        data,
        force
      );
      dispatch({
        type: LOAD_INSTITUTION_DAYSOFF,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const updateInstitutionSchedules =
  (institution_id, data, force) => async (dispatch) => {
    try {
      const res = await InstitucionService.updateInstitutionSchedules(
        institution_id,
        data,
        force
      );
      dispatch({
        type: LOAD_INSTITUTION_SCHEDULES,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const uploadAdvancePayment =
  (institution_id, data) => async (dispatch) => {
    try {
      const res = await InstitucionService.uploadAdvancePayment(
        institution_id,
        data
      );
      dispatch({
        type: LOAD_INSTITUTION_ADVANCE_PAYMENT,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const deleteAllInstitutionSchedules =
  (institution_id) => async (dispatch) => {
    try {
      const res = await InstitucionService.deleteAllInstitutionSchedules(
        institution_id
      );
      dispatch({
        type: DELETE_INSTITUTION_SCHEDULES,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const change = (payload) => (dispatch) => {
  console.log("En la action de change state");
  console.log(payload);
  dispatch({ type: "UPDATE_INSTITUTION", payload });
};

export const setInstitution = (payload) => (dispatch) => {
  console.log("En la action de setInstitution state");
  console.log(payload);
  dispatch({ type: "SET_INSTITUTION", payload });
};

export const retrieveCretrieveInstitutionByAdmainEmailourts =
  (user_email) => async (dispatch) => {
    try {
      const res = await InstitucionService.getByAdminEmail(user_email);
      dispatch({
        type: RETRIEVE_INSTITUTION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
