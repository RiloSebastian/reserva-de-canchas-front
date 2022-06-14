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

  switch (type) {
    case GET_INSTITUTION:
      return {
        ...state,
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
