const INITIAL_STATE = {
  salesInvoicePaginate: [],
  salesInvoicePaginateLength: [],
  salesSearchInvoicePaginate: [],
  salesSearchInvoicePaginateLength: [],
  salesFilterInvoicePaginate: [],
  salesFilterInvoicePaginateLength: [],
  salesInvoiceTanggalASCPaginate: [],
  salesInvoiceTanggalASCPaginateLength: [],
  salesInvoiceTanggalDSCPaginate: [],
  salesInvoiceTanggalDSCPaginateLength: [],
  salesInvoiceTotalASCPaginate: [],
  salesInvoiceTotalASCPaginateLength: [],
  salesInvoiceTotalDSCPaginate: [],
  salesInvoiceTotalDSCPaginateLength: [],
}

export const salesInvoiceReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET INVOICE
    case "SALES_INVOICE_PAGINATE":
      console.log(`SALES_INVOICE_PAGINATE -- salesInvoiceyReducers`)
      return { ...state, salesInvoicePaginate: action.payload };
    case "SALES_INVOICE_PAGINATE_LENGTH":
      console.log(`SALES_INVOICE_PAGINATE_LENGTH -- salesInvoiceReducers`)
      return { ...state, salesInvoicePaginateLength: action.payload };

    // SEARCH INVOICE
    case "SEARCH_INVOICE_PAGINATE":
      console.log(`SEARCH_INVOICE_PAGINATE -- searchInvoiceReducers`)
      return { ...state, salesSearchInvoicePaginate: action.payload };
    case "SEARCH_INVOICE_PAGINATE_LENGTH":
      console.log(`SEARCH_INVOICE_PAGINATE_LENGTH -- searchInvoiceReducers`)
      return { ...state, salesSearchInvoicePaginateLength: action.payload };

    // FILTER INVOICE
    case "FILTER_INVOICE_PAGINATE":
      console.log(`FILTER_INVOICE_PAGINATE -- filterInvoiceReducers`)
      return { ...state, salesFilterInvoicePaginate: action.payload };
    case "FILTER_INVOICE_PAGINATE_LENGTH":
      console.log(`FILTER_INVOICE_PAGINATE_LENGTH -- filterInvoiceReducers`)
      return { ...state, salesFilterInvoicePaginateLength: action.payload };

    // SORT TANGGAL ASC PRODUCT
    case "INVOICE_TANGGAL_ASC_PAGINATE":
      console.log(`INVOICE_TANGGAL_ASC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesInvoiceTanggalASCPaginate: action.payload };
    case "INVOICE_TANGGAL_ASC_PAGINATE_LENGTH":
      console.log(`INVOICE_TANGGAL_ASC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesInvoiceTanggalASCPaginateLength: action.payload };

    // SORT TANGGAL DSC PRODUCT
    case "INVOICE_TANGGAL_DSC_PAGINATE":
      console.log(`INVOICE_TANGGAL_DSC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesInvoiceTanggalDSCPaginate: action.payload };
    case "INVOICE_TANGGAL_DSC_PAGINATE_LENGTH":
      console.log(`INVOICE_TANGGAL_DSC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesInvoiceTanggalDSCPaginateLength: action.payload };

    // SORT TOTAL ASC
    case "INVOICE_TOTAL_ASC_PAGINATE":
      console.log(`INVOICE_TOTAL_ASC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesInvoiceTotalASCPaginate: action.payload };
    case "INVOICE_TOTAL_ASC_PAGINATE_LENGTH":
      console.log(`INVOICE_TOTAL_ASC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesInvoiceTotalASCPaginateLength: action.payload };

    // SORT TOTAL DSC
    case "INVOICE_TOTAL_DSC_PAGINATE":
      console.log(`INVOICE_TOTAL_DSC_PAGINATE -- productHistoryReducers`)
      return { ...state, salesInvoiceTotalDSCPaginate: action.payload };
    case "INVOICE_TOTAL_DSC_PAGINATE_LENGTH":
      console.log(`INVOICE_TOTAL_DSC_PAGINATE_LENGTH -- productHistoryReducers`)
      return { ...state, salesInvoiceTotalDSCPaginateLength: action.payload };

    default:
      return state
  }
}
