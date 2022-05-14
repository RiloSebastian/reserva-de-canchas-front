import http from "../../http-common";

const getAllForSignUp = async () => {
  try {
    const listadoDeportes = await http.get(`/roles`);
    console.log("listado de deportes");
    console.log(listadoDeportes);
    return listadoDeportes;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export default {
  getAllForSignUp,
};
