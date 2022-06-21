import axios from "axios";

const API_URL =
  "https://api.locationiq.com/v1/autocomplete.php?key=pk.41bea2e968099330596a319f3318662b&q=";

const getGeoLocalization = async (address) => {
  console.log("URL FORMADA");
  console.log(`${API_URL}${address}&countrycodes=AR&limit=5&dedupe=1`);

  return await axios
    .get(`${API_URL}${address}&countrycodes=AR&limit=10&dedupe=1`)
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

export default {
  getGeoLocalization,
};
