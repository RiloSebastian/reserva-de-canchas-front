import axios from "axios";
import { persistor } from "../store";

const API_URL = "http://localhost:8080/api/auth/";

const login = async (username, password) => {
  return await axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log("obteniendo usuario");
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((err) => {
      console.log("error al ingresar");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  persistor.purge();
};

const register = async (firstName, lastName, userRole, email, password) => {
  return await axios
    .post(API_URL + "signup", {
      firstName,
      lastName,
      userRole,
      email,
      password,
    })
    .then((response) => {
      console.log("registrnado usuario");
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((err) => {
      console.log("error al registrar usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const getCurrentUser = () => {
  return JSON.stringify(localStorage.getItem("user"));
  //return localStorage.getItem('user');
};

const sendVerificationEmail = async (email) => {
  return await axios
    .post(API_URL + "verification", {
      email,
    })
    .then((response) => {
      console.log("email enviado correctamente al usuario");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al enviar email al usuario");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  sendVerificationEmail,
};
