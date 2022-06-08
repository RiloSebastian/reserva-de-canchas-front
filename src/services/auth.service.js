import axios from "axios";

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
      console.log("error al registrar usuario catch");
      console.log(err.response);
      return Promise.reject(err.response);
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = async (firstName, lastName, role, email, password) => {
  try {
    return await axios.post(API_URL + "signup", {
      firstName,
      lastName,
      role,
      email,
      password,
    });
  } catch (err) {
    console.log("error al registrar usuario");
    console.log(err);
    return Promise.reject(err);
  }
};

const getCurrentUser = () => {
  return JSON.stringify(localStorage.getItem("user"));
  //return localStorage.getItem('user');
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
