import http from "../../http-common";
import AuthHeader from "../auth-header";

const getAll = (institution_id) => {
  return http.get(`/institutions/${institution_id}/courts`);
};

const get = async (institution_id, court_id) => {
  try {
    return await http.get(`/institutions/${institution_id}/courts/${court_id}`);
  } catch (err) {
    console.log(err);
  }
};

const create = async (institution_id, data) => {
  return await http.post(`/institutions/${institution_id}/courts`, data);
};
const update = async (data) => {
  return await http.put(`/courts/${data.id}`, data);
};
const setCourtSchedules = (court_id, data, force) => {
  console.log("ENVIANDO INFO AL BACK");
  console.log(court_id);
  console.log(data);
  console.log(force);
  return http.put(`/courts/${court_id}/schedules?force=${force}`, data);
};
const remove = async (court_id) => {
  return await http.delete(`/courts/${court_id}`);
};

const removeAll = async (institution_id) => {
  try {
    return await http.delete(`/institutions/${institution_id}/courts`, {
      headers: AuthHeader(),
    });
  } catch (err) {
    console.log(err);
  }
};

const findCourtsByCustomerPreferences = async (customer_preferences) => {
  console.log("DENTRO DE CANCHA SERVICE => findCourtsByCustomerPreferences");
  console.log(customer_preferences);
  try {
    const canchasEncontradas = await http.post(
      `/search/courts`,
      customer_preferences,
      {
        headers: AuthHeader(),
      }
    );
    console.log("canchas encontradas para el usuario");
    console.log(canchasEncontradas);
    return canchasEncontradas;
  } catch (err) {
    console.log("error al buscar canchas para el usuario");
    console.log(err.response);
    return Promise.reject(err.response);
  }
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  setCourtSchedules,
  findCourtsByCustomerPreferences,
};
