import { RETRIEVE_SPORTS, CLEAN_SPORTS } from "../actions/types";

const initialState = [];

export default function (sports = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_SPORTS:
      return payload;
    case CLEAN_SPORTS:
      return payload;
    default:
      return sports;
  }
}
