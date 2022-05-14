import http from "../../http-common";
import AuthHeader from "../auth-header";

const getAll = async (institution_id) => {
  try {
    const listadoCanchas = await http.get(
      `/institutions/${institution_id}/courts`
    );
    console.log("listadoCanchas");
    console.log(listadoCanchas);
    return listadoCanchas;
  } catch (err) {
    console.log(" error al obtener todas las canchas");
    console.log(err);
    return Promise.reject(err);
  }
};

const get = async (institution_id, court_id) => {
  try {
    return await http.get(`/institutions/${institution_id}/courts/${court_id}`);
  } catch (err) {
    console.log(err);
  }
};

const create = async (institution_id, data) => {
  try {
    const canchaCreada = await http.post(
      `/institutions/${institution_id}/courts`,
      data,
      {
        headers: AuthHeader(),
      }
    );
    console.log("cancha creada");
    console.log(canchaCreada);
    return canchaCreada;
  } catch (err) {
    console.log(err);
  }
};

const update = async (institution_id, data) => {
  try {
    return await http.patch(
      `/institutions/${institution_id}/courts/${data.id}`,
      data,
      {
        headers: AuthHeader(),
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const remove = async (institution_id, court_id) => {
  try {
    return await http.delete(
      `/institutions/${institution_id}/courts/${court_id}`,
      {
        headers: AuthHeader(),
      }
    );
  } catch (err) {
    console.log(err);
  }
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

/*
const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
};
*/

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
