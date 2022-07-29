import {
  DELETE_INSTITUTION_SCHEDULES,
  GET_INSTITUTION_SCHEDULES_FAILED,
  LOAD_INSTITUTION_DAYSOFF,
  LOAD_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_TIMES,
  RETRIEVE_INSTITUTION,
  UPDATE_INSTITUTION,
} from "../actions/types";

const initialState = {};

export default function (institution = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_INSTITUTION:
      return payload;
    case UPDATE_INSTITUTION:
      return {
        ...institution,
        payload,
      };
    case LOAD_INSTITUTION_DAYSOFF:
      return {
        ...institution,
        freeDays: payload,
      };
    case LOAD_INSTITUTION_SCHEDULES:
      return {
        ...institution,
        schedules: payload,
      };
    case DELETE_INSTITUTION_SCHEDULES:
      return {
        ...institution,
        schedules: [],
      };
    case GET_INSTITUTION_SCHEDULES_FAILED:
      return {
        ...institution,
        schedules: [],
      };
    case LOAD_INSTITUTION_TIMES:
      return {
        ...institution,
        times: payload,
      };
    default:
      return institution;
  }
}
