import { combineReducers } from "redux";
import { userReducers } from "./userReducers";
import { addressReducers } from "./addressReducers";
import { getProvinceReducers } from "./getProvinceReducers";
import { getCityReducers } from "./getCityReducers";
import { getCostReducers } from "./getCostReducers";
import { cartReducers } from "./cartReducers";
import { transactionReducers } from "./transactionReducers";

export const globalStore = combineReducers({
  userReducers, addressReducers, getProvinceReducers, getCityReducers, cartReducers, getCostReducers, transactionReducers
})