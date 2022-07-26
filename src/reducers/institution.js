import {
  SET_INSTITUTION,
  UPDATE_INSTITUTION,
  LOAD_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_TIMES,
  RETRIEVE_INSTITUTION,
  DELETE_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_DAYSOFF,
  CREATE_MANAGER,
  UPDATE_MANAGER,
  DELETE_MANAGER,
  RETRIEVE_MANAGERS,
  RETRIEVE_EMPLOYEES,
  RETRIEVE_COACHES,
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
    case LOAD_INSTITUTION_TIMES:
      return {
        ...institution,
        times: payload,
      };
    default:
      return institution;
  }
}
