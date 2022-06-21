import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import institution from "./institution";

export default combineReducers({
  auth,
  message,
  institution,
});
