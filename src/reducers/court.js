import {
  RETRIEVE_COURTS,
  CREATE_COURT,
  UPDATE_COURT,
  DELETE_COURT,
} from "../actions/types";

const initialState = [];

export default function (courts = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COURT:
      return [...courts, payload];
    case RETRIEVE_COURTS:
      return payload;
    case UPDATE_COURT:
      return courts.map((court) => {
        if (court.id === payload.id) {
          return {
            ...court,
            ...payload,
          };
        } else {
          return court;
        }
      });
    case DELETE_COURT:
      return courts.filter(({ id }) => id !== payload.id);
    default:
      return courts;
  }
}
