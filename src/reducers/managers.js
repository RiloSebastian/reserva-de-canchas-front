import {
  RETRIEVE_MANAGERS,
  CREATE_MANAGER,
  UPDATE_MANAGER,
  DELETE_MANAGER,
} from "../actions/types";

const initialState = [];

export default function (managers = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MANAGER:
      return [...managers, payload];
    case RETRIEVE_MANAGERS:
      return payload;
    case UPDATE_MANAGER:
      return managers.map((manager) => {
        if (managers.id === payload.id) {
          return {
            ...manager,
            ...payload,
          };
        } else {
          return manager;
        }
      });
    case DELETE_MANAGER:
      return managers.filter(({ id }) => id !== payload.id);
    default:
      return managers;
  }
}
