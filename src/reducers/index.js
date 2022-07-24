import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import institution from "./institution";
import court from "./court";

export default combineReducers({
  auth,
  message,
  institution,
  court,
});
