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
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data,
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/e/e4/Roger_Federer_%2818566686046%29.jpg",
          })
        );
      }
      return {
        ...response.data,
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/e4/Roger_Federer_%2818566686046%29.jpg",
      };
    })
    .catch((err) => {
      console.log("error al ingresar");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const logout = () => {
  localStorage.removeItem("userPending");
  localStorage.removeItem("user");
  localStorage.removeItem("institution");
  localStorage.removeItem("token");
  persistor.purge();
};

const register = async (
  firstName,
  lastName,
  userRole,
  email,
  password,
  telephone
) => {
  return await axios
    .post(API_URL + "signup", {
      firstName,
      lastName,
      userRole,
      email,
      password,
      telephone,
    })
    .then((response) => {
      console.log("registrnado usuario");
      console.log(response);
      localStorage.setItem("userPending", JSON.stringify(response.data));
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

const enable = async (userToken) => {
  console.log("ENVIANDO TOKEN CONVERTIDO A STRINGS");
  console.log(typeof userToken);

  return await axios
    .post(API_URL + "enable-user", { userToken })
    .then((response) => {
      console.log("habilitando usuario");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al habilitar el usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const getCurrentUser = () => {
  return JSON.stringify(localStorage.getItem("user"));
  //return localStorage.getItem('user');
};

export default {
  register,
  enable,
  login,
  logout,
  getCurrentUser,
};
