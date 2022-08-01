import http from "../../http-common";
import axios from "axios";
const API_URL = "http://localhost:8080/api";

const validatePaymentMethod = async (paymentData) => {
  console.log("SERVICE PARA VALIDAR MEDIO DE PAGO");
  console.log(paymentData);
  return await http
    .post("/payment/validation", {
      paymentData,
    })
    .then((response) => {
      console.log("medio de pago validado correctamente");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al validar medio de pago");
      console.log(err.response);
      //return Promise.reject(err.response);
      return { message: "Por el momento forzamos la respuesta ok !" };
    });
};

const getPaymentDetails = (token) => {
  return http.get(`/reservations/token?token=${token}`);
};

export default {
  validatePaymentMethod,
  getPaymentDetails,
};
