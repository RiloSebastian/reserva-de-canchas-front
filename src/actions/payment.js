import PaymentService from "../services/checkout/PaymentService";
import { CLEAN_PAYMENT, PAYMENT_DETAILS } from "./types";

export const getPaymentDetails = (userToken) => async (dispatch) => {
  try {
    const res = await PaymentService.getPaymentDetails(userToken);
    dispatch({
      type: PAYMENT_DETAILS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: CLEAN_PAYMENT,
      payload: [],
    });
    return Promise.reject(err.response);
  }
};
