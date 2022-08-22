import { combineReducers } from "redux";
import { userReducers } from "./userReducers";

export const globalStore = combineReducers({
  userReducers,
})