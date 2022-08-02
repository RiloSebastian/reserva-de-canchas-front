import { PAYMENT_DETAILS, CLEAN_PAYMENT } from "../actions/types";

const initialState = {};

export default function (payment = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_DETAILS:
      return payload;
    case CLEAN_PAYMENT:
      return {};
    default:
      return payment;
  }
}
