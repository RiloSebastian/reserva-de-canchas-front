import {
  CREATE_MANAGER,
  DELETE_INSTITUTION_SCHEDULES,
  DELETE_MANAGER,
  GET_INSTITUTION,
  GET_INSTITUTION_FAILED,
  GET_INSTITUTION_SCHEDULES_FAILED,
  LOAD_INSTITUTION_ADVANCE_PAYMENT,
  LOAD_INSTITUTION_DAYSOFF,
  LOAD_INSTITUTION_SCHEDULES,
  RETRIEVE_COACHES,
  RETRIEVE_EMPLOYEES,
  RETRIEVE_INSTITUTION,
  RETRIEVE_MANAGERS,
  UPDATE_INSTITUTION,
  UPDATE_MANAGER,
} from "./types";

import InstitucionService from "../services/instituciones/InstitucionService";
import userService from "../services/user.service";

export const createUserForInstitution =
  (institution_id, role_type, data) => async (dispatch) => {
    try {
      const res = await InstitucionService.createUserForInstitution(
        institution_id,
        role_type,
        data
      );
      dispatch({
        type: CREATE_MANAGER,
        payload: res.data[0],
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const updateAppUser = (data) => async (dispatch) => {
  try {
    const res = await userService.update(data.id, data);
    dispatch({
      type: UPDATE_MANAGER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const deleteAppUser = (user_id) => async (dispatch) => {
  try {
    const res = await userService.remove(user_id);
    dispatch({
      type: DELETE_MANAGER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const getInstitutionSchedules = (institution_id) => async (dispatch) => {
  try {
    const res = await InstitucionService.getInstitutionSchedules(
      institution_id
    );
    dispatch({
      type: LOAD_INSTITUTION_SCHEDULES,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: GET_INSTITUTION_SCHEDULES_FAILED,
    });
    return Promise.reject(err.response);
  }
};

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

export const retrieveInstitutionByAdmainEmail =
  (user_email) => async (dispatch) => {
    try {
      const res = await InstitucionService.getByAdminEmail(user_email);
      dispatch({
        type: RETRIEVE_INSTITUTION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

export const retrieveManagers = (institution_id) => async (dispatch) => {
  try {
    const res = await InstitucionService.getAllManagers(institution_id);
    dispatch({
      type: RETRIEVE_MANAGERS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveEmployees = (institution_id) => async (dispatch) => {
  try {
    const res = await InstitucionService.getAllEmployees(institution_id);
    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveCoches = (institution_id) => async (dispatch) => {
  try {
    const res = await InstitucionService.getAllCoaches(institution_id);
    dispatch({
      type: RETRIEVE_COACHES,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
