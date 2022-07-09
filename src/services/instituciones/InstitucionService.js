import React from "react";
import http from "../../http-common";

const getAll = () => {
  return http.get(`/institutions`);
};

const get = async (institution_id) => {
  return await http
    .get(`/institutions/${institution_id}`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
};

const getByAdminEmail = async (admin_email) => {
  return await http
    .get(`/institutions/admin/${admin_email}`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
};

/* const getByAdminEmail = async (admin_email) => {
  return await http
    .get(`/institutions/admin/${admin_email}`)
    .then((response) => response.data)
    .then(async (institution) => {
      console.log("institution obtenida");

      console.log(institution);

      const schedules = await getInstitutionSchedules(institution.id)
        .then((schedules) => {
          console.log("horarios obtenidos");

          console.log(schedules);
          return schedules;
        })
        .catch((err) => []);
      //.catch((err) => Promise.reject(err));

      const institutionWithSchedules = {
        ...institution,
        schedules,
      };

      if (institution) {
        localStorage.setItem(
          "institution",
          JSON.stringify(institutionWithSchedules)
        );
      }

      return institutionWithSchedules;
    })
    .catch((err) => Promise.reject(err));
}; */

const getInstitutionSchedules = async (institution_id) => {
  return await http
    .get(`/institutions/${institution_id}/schedules`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
};

const createInstitutionSchedules = async (institution_id, data) => {
  return await http
    .post(`/institutions/${institution_id}/schedules`, data)
    .then((response) => {
      console.log("CREANDO HORARIO PARA INSTITUCION");
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("ERROR AL CREAR HORARIO PARA INSTITUCION");
      console.log(err.response);

      return Promise.reject(err.response);
    });
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

const uploadNonWorkingDays = async (institution_id, data) => {
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

const uploadAdvancePayment = async (institution_id, data) => {
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

const create = (data) => {
  return http.post(`/institutions`, data);
};

const update = (institution_id, data) => {
  return http.put(`/institutions/${institution_id}`, data);
};

const remove = (institution_id) => {
  return http.delete(`/institutions/${institution_id}`);
};

const removeAll = () => {
  return http.delete(`/institutions`);
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
  createInstitutionSchedules,
  uploadImages,
  uploadFeriados,
  uploadNonWorkingDays,
  uploadAdvancePayment,
};
