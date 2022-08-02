import DeporteService from "../services/deportes/DeporteService";
import GeoLocalizacionService from "../services/geolocalizacion/GeoLocalizacionService";
import { RETRIEVE_LOCATIONS, CLEAN_LOCATIONS } from "./types";

export const retrieveLocations = () => async (dispatch) => {
  try {
    const res = await GeoLocalizacionService.getAllLocations();
    dispatch({
      type: RETRIEVE_LOCATIONS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: CLEAN_LOCATIONS,
      payload: [],
    });
    return Promise.reject(err);
  }
};
