import {
  SET_INSTITUTION,
  UPDATE_INSTITUTION,
  LOAD_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_TIMES,
  RETRIEVE_INSTITUTION,
  DELETE_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_DAYSOFF,
} from "../actions/types";

/* const initialState = {
  id: "",
  name: "",
  address: {
    langAddress: "",
    geometry: {
      coordinates: [0, 0],
      type: "Point",
    },
  },
  description: "",
  email: "",
  institutionTel: "",
  managers: [],
  schedules: [],
  times: {},
}; */
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

  /* switch (type) {
    case SET_INSTITUTION:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        description: payload.description,
        institutionTel: payload.institutionTel,
        address: payload.address,
        schedules: payload.schedules,
        scheduleMinTime: payload.scheduleMinTime,
        scheduleMaxTime: payload.scheduleMaxTime,
        managers: payload.managers,
      };
    case UPDATE_INSTITUTION:
      return {
        ...state,
        [payload.type]: payload.data,
      };
    case LOAD_INSTITUTION_SCHEDULES:
      return {
        ...state,
        schedules: payload,
      };
    case LOAD_INSTITUTION_TIMES:
      return {
        ...state,
        times: payload,
      };
    default:
      return state;
  } */
}
