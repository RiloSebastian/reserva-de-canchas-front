import http from "../../http-common";

const getAll = () => {
  return http.get(`/institutions`);
};

const get = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}`);
};

const getByAdminEmail = async (admin_email) => {
  return await http.get(`/institutions/admin/${admin_email}`);
};

const getAllUsers = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}/users`);
};

const getAllManagers = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}/managers`);
};

const getAllEmployees = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}/employees`);
};

const getAllCoaches = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}/coaches`);
};

const getInstitutionSchedules = async (institution_id) => {
  return await http.get(`/institutions/${institution_id}/schedules`);
};

const updateInstitutionSchedules = async (institution_id, data, force) => {
  return await http.put(
    `/institutions/${institution_id}/schedules?force=${force}`,
    data
  );
};

const uploadNonWorkingDays = async (institution_id, data, force) => {
  return await http.put(
    `/institutions/${institution_id}/daysoff?force=${force}`,
    data
  );
};

const uploadAdvancePayment = async (institution_id, data) => {
  return await http.post(
    `/institutions/${institution_id}/advance-payment`,
    data
  );
};

const uploadImages = async (institution_id, data) => {
  /* return await http
    .post(`/institutions/${institution_id}/images`, data)
    .then((response) => {
      console.log("CREANDO HORARIO PARA INSTITUCION");
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("ERROR AL CREAR HORARIO PARA INSTITUCION");
      console.log(err.response);

      return Promise.reject(err.response);
    }); */
};

const uploadFeriados = async (institution_id, data) => {
  /* return await http
    .post(`/institutions/${institution_id}/images`, data)
    .then((response) => {
      console.log("CREANDO HORARIO PARA INSTITUCION");
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("ERROR AL CREAR HORARIO PARA INSTITUCION");
      console.log(err.response);

      return Promise.reject(err.response);
    }); */
};

const create = async (data) => {
  return await http.post(`/institutions`, data);
};

const createUserForInstitution = async (institution_id, role_type, data) => {
  return await http.post(`/institutions/${institution_id}/${role_type}`, data);
};

const update = async (institution_id, data) => {
  return await http.put(`/institutions/${institution_id}`, data);
};

const remove = (institution_id) => {
  return http.delete(`/institutions/${institution_id}`);
};

const removeAll = () => {
  return http.delete(`/institutions`);
};

const deleteAllInstitutionSchedules = (institution_id) => {
  return http.delete(`/institutions/${institution_id}/schedules`);
};

export default {
  getAll,
  get,
  getByAdminEmail,
  create,
  update,
  remove,
  removeAll,
  getInstitutionSchedules,
  updateInstitutionSchedules,
  uploadImages,
  uploadFeriados,
  uploadNonWorkingDays,
  uploadAdvancePayment,
  deleteAllInstitutionSchedules,
  createUserForInstitution,
  getAllCoaches,
  getAllEmployees,
  getAllManagers,
  getAllUsers,
};
