import http from '../../http-common'
import AuthHeader from '../auth-header';

const getAll = async () => {
    try {
        const listadoDeportes = await http.get(`/sports`, { headers: AuthHeader() });
        console.log('listado de deportes');
        console.log(listadoDeportes);
        return listadoDeportes;
    } catch (err) {
        console.log(err);
    }
};

export default {
    getAll,
};