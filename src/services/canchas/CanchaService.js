import http from '../../http-common'
import AuthHeader from '../auth-header';

const getAll = async (institution_id) => {
    try {
        const listadoCanchas = await http.get(`/institutions/${institution_id}/courts`, { headers: AuthHeader() });
        console.log('listadoCanchas');
        console.log(listadoCanchas);
        return listadoCanchas;
    } catch (err) {
        console.log(err);
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
        const canchaCreada = await http.post(`/institutions/${institution_id}/courts`, data,
            {
                headers: AuthHeader(),
            });
        console.log('cancha creada');
        console.log(canchaCreada);
        return canchaCreada;
    } catch (err) {
        console.log(err);
    }
};

const update = async (institution_id, court_id, data) => {
    try {
        return await http.put(`/institutions/${institution_id}/courts/${court_id}`, data,
            {
                headers: AuthHeader(),
            });
    } catch (err) {
        console.log(err);
    }
};

const remove = async (institution_id, court_id) => {
    try {
        return await http.delete(`/institutions/${institution_id}/courts/${court_id}`);
    } catch (err) {
        console.log(err);
    }
};

const removeAll = async (institution_id) => {
    try {
        return await http.delete(`/institutions/${institution_id}/courts`);
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
    removeAll
};
