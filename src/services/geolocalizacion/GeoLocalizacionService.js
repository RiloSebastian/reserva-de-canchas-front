import LocationIQ from "react-native-locationiq-autocomplete";
import axios from "axios";
/* LocationIQ.reverse(41.89, 12.49)
  .then((json) => {
    var address = json.address;
    console.log(adress);
  })
  .catch((error) => console.warn(error));

LocationIQ.nearby(41.89, 12.49, "hospital", 1000)
  .then((json) => {
    var address = json.address;
    console.log(adress);
  })
  .catch((error) => console.warn(error));

// Works as well :
// ------------

// location object
LocationIQ.reverse({
  latitude: 41.89,
  longitude: 12.49,
});

// latlng object
LocationIQ.reverse({
  lat: 41.89,
  lng: 12.49,
});

// array
LocationIQ.reverse([41.89, 12.49]); */

const API_URL =
  "https://api.locationiq.com/v1/autocomplete.php?key=pk.41bea2e968099330596a319f3318662b&q=";

const getGeoLocalization = async (address) => {
  // Initialize the module (needs to be done only once)
  /* await LocationIQ.init("pk.41bea2e968099330596a319f3318662b"); // use a valid API key

  return await LocationIQ.search(address)
    .then((json) => {
      console.log("Response getGeoLocalization");
      console.log(json);
      var lat = json[0].lat;
      var lon = json[0].lon;
      console.log(lat, lon);
      return json;
    })
    .catch((error) => {
      console.warn(error);
      return Promise.reject(error);
    }); */

  return await axios
    .get(`${API_URL}${address}&countrycodes=AR`)
    .then((response) => response)
    .catch((err) => {
      console.warn(err);
      return Promise.reject(err);
    });
};

export default {
  getGeoLocalization,
};
