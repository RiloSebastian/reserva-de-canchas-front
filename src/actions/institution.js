import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    GET_INSTITUTION,
    GET_INSTITUTION_FAILED
} from "./types";

import InstitucionService from "../services/instituciones/InstitucionService";

export const get = (institution_id) => (dispatch) => {
    return InstitucionService.get(institution_id).then(
        (response) => {

            console.log("ejecutando action para obtener datos de la institucion")
            console.log(response)

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
