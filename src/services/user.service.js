import http from "../http-common";
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
  return await http.put(`/users/${user_id}`, data);
};

const remove = async (user_id) => {
  return await http.delete(`/users/${user_id}`);
};

export default { update, remove, retrieveUser };
