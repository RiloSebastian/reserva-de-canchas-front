import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  LOAD_INSTITUTION_SCHEDULES,
  GET_INSTITUTION,
  GET_INSTITUTION_FAILED,
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

      return Promise.resolve();
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

export const change = (payload) => (dispatch) => {
  console.log("En la action de change state");
  console.log(payload);
  dispatch({ type: "UPDATE_INSTITUTION", payload });
};
