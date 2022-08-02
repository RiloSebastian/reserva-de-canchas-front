import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GET_USER_DETAILS,
  GET_USER_DETAILS_FAILED,
} from "./types";

import AuthService from "../services/auth.service";
import userService from "../services/user.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
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
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const retrieveUser = (user_id) => (dispatch) => {
  return userService.retrieveUser(user_id).then(
    (data) => {
      console.log("ejecutando action para obtener datos del usuario");
      console.log(data);

      dispatch({
        type: GET_USER_DETAILS,
        payload: { user: data },
      });

      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_USER_DETAILS_FAILED,
      });

      return Promise.reject();
    }
  );
};
