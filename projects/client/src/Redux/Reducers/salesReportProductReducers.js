const INITIAL_STATE = {
  salesReportPaginate: [],
  salesReportPaginateLength: [],
  salesSearchPaginate: [],
  salesSearchPaginateLength: [],
  salesSortTotalASCPaginate: [],
  salesSortTotalASCPaginateLength: [],
  salesSortTotalDSCPaginate: [],
  salesSortTotalDSCPaginateLength: [],
}

export const salesReportProductReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET PRODUCT
    case "SALES_REPORT_PAGINATE":
      console.log(`SALES_REPORT_PAGINATE -- salesReportReducers`)
      return { ...state, salesReportPaginate: action.payload };
    case "SALES_REPORT_PAGINATE_LENGTH":
      console.log(`SALES_REPORT_PAGINATE_LENGTH -- salesReportReducers`)
      return { ...state, salesReportPaginateLength: action.payload };

    // SEARCH PRODUCT
    case "SEARCH_PAGINATE":
      console.log(`SEARCH_PAGINATE -- salesReportReducers`)
      return { ...state, salesSearchPaginate: action.payload };
    case "SEARCH_PAGINATE_LENGTH":
      console.log(`SEARCH_PAGINATE_LENGTH -- salesReportReducers`)
      return { ...state, salesSearchPaginateLength: action.payload };

    // SORT TOTAL ASC PRODUCT
    case "SORT_TOTAL_ASC_PAGINATE":
      console.log(`SORT_TOTAL_ASC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesSortTotalASCPaginate: action.payload };
    case "SORT_TOTAL_ASC_PAGINATE_LENGTH":
      console.log(`SORT_TOTAL_ASC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesSortTotalASCPaginateLength: action.payload };

    // SORT TOTAL DSC PRODUCT
    case "SORT_TOTAL_DSC_PAGINATE":
      console.log(`SORT_TOTAL_DSC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesSortTotalDSCPaginate: action.payload };
    case "SORT_TOTAL_DSC_PAGINATE_LENGTH":
      console.log(`SORT_TOTAL_DSC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesSortTotalDSCPaginateLength: action.payload };

    default:
      return state
  }
}
