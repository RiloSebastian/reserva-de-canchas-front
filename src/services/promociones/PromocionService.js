import http from "../../http-common";
import AuthHeader from "../auth-header";

const getAll = async () => {
  return await http
    .get(`/promotions`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
};

const getAllByInstitutionId = async (institution_id) => {
  return await http
    .get(`/promotions/${institution_id}`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
};

const get = async (institution_id, court_id) => {
  return await http.get(`/institutions/${institution_id}/courts/${court_id}`);
};

const create = async (institution_id, data) => {
  return await http
    .post(`/promotions`, { ...data, institutionId: institution_id })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response));
};

const update = async (promo_id, data) => {
  return await http
    .put(`/promotions/${promo_id}/courts`, data)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response));
};

const remove = async (promo_id) => {
  return await http
    .delete(`/promotions/${promo_id}`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response));
};

const removeAllById = async (promos_ids) => {
  return await http
    .delete(`/promotions/`, promos_ids)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response));
};

export default {
  getAll,
  getAllByInstitutionId,
  get,
  create,
  update,
  remove,
  removeAllById,
};
