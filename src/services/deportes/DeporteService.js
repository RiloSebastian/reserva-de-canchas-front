import http from "../../http-common";

/* const getAll = async () => {
    try {
        const listadoDeportes = await http.get(`/sports`, { headers: AuthHeader() });
        console.log('listado de deportes');
        console.log(listadoDeportes);
        return listadoDeportes;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};
 */
const getAll = () => {
  return http.get(`/sports`);
};

export default {
  getAll,
};
