import {
  SET_INSTITUTION,
  UPDATE_INSTITUTION,
  LOAD_INSTITUTION_SCHEDULES,
  LOAD_INSTITUTION_TIMES,
} from "../actions/types";

const initialState = {
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
  manager: "",
  schedules: [],
  times: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("actualizando intitucion");
  console.log(payload);

  switch (type) {
    case SET_INSTITUTION:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        description: payload.description,
        institutionTel: payload.institutionTel,
        address: payload.address,
        schedules: payload.schedules,
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
  }
}
