import DeporteService from "../services/deportes/DeporteService";
import { RETRIEVE_SPORTS, CLEAN_SPORTS } from "./types";

export const retrieveSports = (institution_id) => async (dispatch) => {
  try {
    const res = await DeporteService.getAll(institution_id);
    dispatch({
      type: RETRIEVE_SPORTS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: CLEAN_SPORTS,
      payload: [],
    });
    return Promise.reject(err);
  }
};
