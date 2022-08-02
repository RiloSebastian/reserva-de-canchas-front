import axios from "axios";
import http from "../../http-common";

const API_URL =
  "https://api.locationiq.com/v1/autocomplete?key=pk.41bea2e968099330596a319f3318662b&q=";

const getGeoLocalization = async (address) => {
  console.log("URL FORMADA");
  console.log(`${API_URL}${address}&countrycodes=AR&dedupe=1`);

  return await axios
    .get(
      `${API_URL}${address}&countrycodes=AR&limit=50&dedupe=1&accept-language=native`
    )
    .then((response) => {
      console.log("RESPUESTA OBTENIDA");
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.warn(err);
      return Promise.reject(err);
    });
};

const getAllLocations = () => {
  return http.get(`/locations`);
};

export default {
  getGeoLocalization,
  getAllLocations,
};
