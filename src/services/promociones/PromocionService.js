import http from "../../http-common";

const getAll = () => {
  return http.get(`/promotions`);
};

const getAllByInstitutionId = (institution_id) => {
  return http.get(`/promotions/${institution_id}`);
};

const get = (institution_id, court_id) => {
  return http.get(`/institutions/${institution_id}/courts/${court_id}`);
};

const create = (institution_id, data) => {
  return http.post(`/promotions`, { ...data, institutionId: institution_id });
};

const update = (promo_id, data) => {
  return http.put(`/promotions/${promo_id}/courts`, data);
};

const remove = async (promo_id) => {
  return http.delete(`/promotions/${promo_id}`);
};

const removeAllById = (institution_id) => {
  return http.delete(`institutions/promotions/`, institution_id);
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
