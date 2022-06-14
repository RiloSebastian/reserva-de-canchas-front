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
  email: "",
  phone: "",
  manager: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("En el dispatch de Institucion")
  console.log("type: " + type)
  console.log("payload")
  console.log(payload)

  switch (type) {
    case GET_INSTITUTION:
      return {
        institution: payload
      };
    case UPDATE_INSTITUTION:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
