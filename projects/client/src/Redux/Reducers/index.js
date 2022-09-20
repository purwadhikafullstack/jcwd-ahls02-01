import { combineReducers } from "redux";
import { userReducers } from "./userReducers";
import { addressReducers } from "./addressReducers";
import { getProvinceReducers } from "./getProvinceReducers";
import { getCityReducers } from "./getCityReducers";
import { getCostReducers } from "./getCostReducers";
import { cartReducers } from "./cartReducers";
import { productHistoryReducers } from "./productHistoryReducers";
import { salesReportProductReducers } from "./salesReportProductReducers";
import { userSalesReportReducers } from "./salesReportUserReducers";
import { salesInvoiceReducers } from "./salesReportInvoiceReducers";
import { transactionReducers } from "./transactionReducers";
import { productReducers } from "./productReducers";

export const globalStore = combineReducers({
  userReducers, addressReducers, getProvinceReducers, getCityReducers, cartReducers, getCostReducers,
  productHistoryReducers, salesReportProductReducers, userSalesReportReducers, salesInvoiceReducers, transactionReducers, productReducers
})