import axios from "axios";
import http from "../http-common";
//import AuthHeader from "../auth-header";
const API_URL = "http://localhost:8080/";

const retrieveUser = async (user_id) => {
  return await http
    .get(`/users/${user_id}`)
    .then((response) => {
      console.log("actualizando usuario");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al actualizar usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const update = async (user_id, data) => {
  return await http
    .patch(`/users/${user_id}`, data)
    .then((response) => {
      console.log("actualizando usuario");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al actualizar usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const remove = async (user_id) => {
  return await http
    .delete(`/users/${user_id}`)
    .then((response) => {
      console.log("eliminando usuario");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al eliminar usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

/* const update = async (user_id, data) => {
  try {
    return await http.patch(`/users/${user_id}`, data, {
      headers: AuthHeader(),
    });
  } catch (err) {
    console.log(err);
  }
};

const remove = async (user_id) => {
  try {
    return await http.delete(`/users/${user_id}`, {
      headers: AuthHeader(),
    });
  } catch (err) {
    console.log(err);
  }
}; */

export default { update, remove, retrieveUser };
