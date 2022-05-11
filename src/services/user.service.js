import axios from "axios";
import http from "../../http-common";
import AuthHeader from "../auth-header";
const API_URL = "http://localhost:8080/";

const getAdminBoard = () => {
  return axios.get(API_URL, { headers: AuthHeader });
};

const update = async (user_id, data) => {
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
};

export default { update, remove, getAdminBoard };
