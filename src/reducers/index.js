import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import institution from "./institution";
import court from "./court";
import managers from "./managers";
import reservations from "./reservations";
import promotions from "./promotions";

export default combineReducers({
  auth,
  message,
  institution,
  court,
  managers,
  reservations,
  promotions,
});
