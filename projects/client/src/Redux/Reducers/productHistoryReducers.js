const INITIAL_STATE = {
  productHistoryPaginate: [],
  productHistoryPaginateLength: [],
  productSearchPaginate: [],
  productSearchPaginateLength: [],
  productFilterPaginate: [],
  productFilterPaginateLength: [],
  productTanggalASCPaginate: [],
  productTanggalASCPaginateLength: [],
  productTanggalDSCPaginate: [],
  productTanggalDSCPaginateLength: [],
}

export const productHistoryReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET PRODUCT
    case "PRODUK_HISTORY_PAGINATE":
      console.log(`PRODUK_HISTORY_PAGINATE -- productHistoryReducers`)
      return { ...state, productHistoryPaginate: action.payload };
    case "PRODUK_HISTORY_PAGINATE_LENGTH":
      console.log(`PRODUK_HISTORY_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, productHistoryPaginateLength: action.payload };

    // SEARCH PRODUCT
    case "SEARCH_PAGINATE":
      console.log(`SEARCH_PAGINATE -- productHistoryReducers`)
      return { ...state, productSearchPaginate: action.payload };
    case "SEARCH_PAGINATE_LENGTH":
      console.log(`SEARCH_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, productSearchPaginateLength: action.payload };

    // FILTER PRODUCT
    case "FILTER_PAGINATE":
      console.log(`FILTER_PAGINATE -- productHistoryReducers`)
      return { ...state, productFilterPaginate: action.payload };
    case "FILTER_PAGINATE_LENGTH":
      console.log(`FILTER_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, productFilterPaginateLength: action.payload };

    // SORT TANGGAL ASC PRODUCT
    case "SORT_TANGGAL_ASC_PAGINATE":
      console.log(`SORT_TANGGAL_ASC_PAGINATE -- productHistoryReducers`)
      return { ...state, productTanggalASCPaginate: action.payload };
    case "SORT_TANGGAL_ASC_PAGINATE_LENGTH":
      console.log(`SORT_TANGGAL_ASC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, productTanggalASCPaginateLength: action.payload };

    // SORT TANGGAL DSC PRODUCT
    case "SORT_TANGGAL_DSC_PAGINATE":
      console.log(`SORT_TANGGAL_DSC_PAGINATE -- productHistoryReducers`)
      return { ...state, productTanggalDSCPaginate: action.payload };
    case "SORT_TANGGAL_DSC_PAGINATE_LENGTH":
      console.log(`SORT_TANGGAL_DSC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, productTanggalDSCPaginateLength: action.payload };

    default:
      return state
  }
}
