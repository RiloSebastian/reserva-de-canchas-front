import axios from 'axios';
import AuthHeader from './auth-header';

const API_URL = "http://localhost:8080/";


const getAdminBoard = () => {
    return axios.get(API_URL, { headers: AuthHeader })
}


export default { getAdminBoard };
