import { GET_INSTITUTION, UPDATE_INSTITUTION } from "../actions/types";

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
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("actualizando intitucion")
  console.log(payload)

  switch (type) {
    case GET_INSTITUTION:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        description: payload.description,
        institutionTel: payload.institutionTel,
      };
    case UPDATE_INSTITUTION:
      return {
        ...state,
        [payload.type]: payload.data
      };
    default:
      return state;
  }
}
