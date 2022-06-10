import { GET_INSTITUTION, UPDATE_INSTITUTION } from "../actions/types";

const initialState = {
  name: "Palermo Tenis",
  address: {
    textualAddress: "Honduras 5460",
    geometry: {
      coordinates: [0, 0],
      type: "Point",
    },
  },
  email: "palermotenis@email.com",
  phone: "1146584589",
  manager: "Pepito",
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
