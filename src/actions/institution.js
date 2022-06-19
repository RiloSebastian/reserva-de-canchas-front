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

      //TRAIGO LOS HORARIOS DE LA INSTITUCION

      try {
        //obtener horarios seteados de la institucion
        const institutionSchedules = InstitucionService.getInstitutionSchedules(
          response.id
        ).then((data) => data);

        console.log("horarios obtenidos");
        console.log(institutionSchedules);

        dispatch({
          type: LOAD_INSTITUTION_SCHEDULES,
          payload: institutionSchedules,
        });

        //setDiasYHorarios([nuevoDiaYHorario]);
      } catch (error) {
        console.log("error al obtener horarios de instituciones");
      }

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
