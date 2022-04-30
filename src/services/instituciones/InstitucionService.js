import React from 'react';
import http from '../../http-common'

const getAll = () => {
    return http.get(`/institutions`);
};

const get = (institution_id) => {
    return http.get(`/institutions/${institution_id}`);
};

const create = data => {
    return http.post(`/institutions`, data);
};

const update = (institution_id, data) => {
    return http.put(`/institutions/${institution_id}`, data);
};

const remove = institution_id => {
    return http.delete(`/institutions/${institution_id}`);
};

const removeAll = () => {
    return http.delete(`/institutions`);
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
