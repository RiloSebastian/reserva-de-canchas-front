import http from '../../http-common'
import AuthHeader from '../auth-header';
import { Redirect } from "react-router";


const upload = async (owner_id, image) => {

    let formData = new FormData();

    formData.append("file", image);
    formData.append("owner_id", owner_id);

    console.log('agregando imagenes')
    console.log(formData)

    try {
        const imageAdded = await http.post(`/photos/add`, formData,
            {
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
                    "Content-type": "multipart/form-data"
                },
            });
        console.log('imageAdded');
        console.log(imageAdded);
        return imageAdded;
    } catch (err) {
        console.log(err);
    }
};

const getById = async (id) => {
    try {
        const image = await http.get(`/photos/${id}`);
        console.log('image');
        console.log(image);
        return image;
    } catch (err) {
        console.log(' error al obtener image');
        console.log(err);
        return Promise.reject(err);
    }
};


export default {
    upload,
    getById
};
