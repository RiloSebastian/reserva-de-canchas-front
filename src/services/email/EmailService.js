import axios from "axios";

const API_URL = "http://localhost:8080/api/email/";

const sendVerificationEmail = async (email) => {
    return await axios
        .post(API_URL + "verification", {
            email
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
    sendVerificationEmail,
};
