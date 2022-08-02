import {
  RETRIEVE_RESERVATIONS,
  CREATE_RESERVATION,
  UPDATE_RESERVATION,
  DELETE_RESERVATION,
  CLEAN_RESERVATIONS,
  CANCEL_RESERVATION,
} from "../actions/types";

const initialState = [];

export default function (reservations = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_RESERVATION:
      return [...reservations, payload];
    case RETRIEVE_RESERVATIONS:
      return payload;
    case UPDATE_RESERVATION:
      return reservations.map((reservation) => {
        if (reservation.id === payload.id) {
          return {
            ...reservation,
            ...payload,
          };
        } else {
          return reservation;
        }
      });
    case CANCEL_RESERVATION:
      return reservations.filter(({ id }) => id !== payload);
    case DELETE_RESERVATION:
      return reservations.filter(({ id }) => id !== payload.id);
    case CLEAN_RESERVATIONS:
      return [];
    default:
      return reservations;
  }
}
