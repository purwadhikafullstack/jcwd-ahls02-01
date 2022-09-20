const INITIAL_STATE = {
  userSalesReportPaginate: [],
  userSalesReportPaginateLength: [],
  userSalesSearchPaginate: [],
  userSalesSearchPaginateLength: [],
  userSalesTotalASCPaginate: [],
  userSalesTotalASCPaginateLength: [],
  userSalesTotalDSCPaginate: [],
  userSalesTotalDSCPaginateLength: [],
}

export const userSalesReportReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET USER
    case "USER_SALES_REPORT_PAGINATE":
      console.log(`USER_SALES_REPORT_PAGINATE -- salesReportReducers`)
      return { ...state, userSalesReportPaginate: action.payload };
    case "USER_SALES_REPORT_PAGINATE_LENGTH":
      console.log(`USER_SALES_REPORT_PAGINATE_LENGTH -- salesReportReducers`)
      return { ...state, userSalesReportPaginateLength: action.payload };

    // SEARCH USER
    case "SEARCH_USER_PAGINATE":
      console.log(`SEARCH_USER_PAGINATE -- salesReportReducers`)
      return { ...state, userSalesSearchPaginate: action.payload };
    case "SEARCH_USER_PAGINATE_LENGTH":
      console.log(`SEARCH_USER_PAGINATE_LENGTH -- salesReportReducers`)
      return { ...state, userSalesSearchPaginateLength: action.payload };

    // USER TOTAL ASC
    case "USER_TOTAL_ASC_PAGINATE":
      console.log(`USER_TOTAL_ASC_PAGINATE -- productHistoryReducers`)
      return { ...state, userSalesTotalASCPaginate: action.payload };
    case "USER_TOTAL_ASC_PAGINATE_LENGTH":
      console.log(`USER_TOTAL_ASC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, userSalesTotalASCPaginateLength: action.payload };

    // USER TOTAL DSC
    case "USER_TOTAL_DSC_PAGINATE":
      console.log(`USER_TOTAL_DSC_PAGINATE -- productHistoryReducers`)
      return { ...state, userSalesTotalDSCPaginate: action.payload };
    case "USER_TOTAL_DSC_PAGINATE_LENGTH":
      console.log(`USER_TOTAL_DSC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, userSalesTotalDSCPaginateLength: action.payload };

    default:
      return state
  }
}
