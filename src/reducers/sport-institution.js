import {
  RETRIEVE_INSTITUTION_SPORTS,
  CLEAN_INSTITUTION_SPORTS,
} from "../actions/types";

const initialState = [];

export default function (sports = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_INSTITUTION_SPORTS:
      return payload;
    case CLEAN_INSTITUTION_SPORTS:
      return payload;
    default:
      return sports;
  }
}
