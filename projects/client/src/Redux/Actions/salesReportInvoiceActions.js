import Axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

// getInvoice
export const savedSalesInvoicePaginateAction = (data) => {
  console.log("SalesInvoicePaginateAction", data);
  return {
    type: "SALES_INVOICE_PAGINATE",
    payload: data
  }
}
export const savedSalesInvoicePaginateLengthAction = (data) => {
  console.log("savedSalesInvoicePaginateLengthAction", data);
  return {
    type: "SALES_INVOICE_PAGINATE_LENGTH",
    payload: data
  }
}

// searchInvoice
export const savedSearchInvoicePaginateAction = (data) => {
  console.log("SearchInvoiceAction", data);
  return {
    type: "SEARCH_INVOICE_PAGINATE",
    payload: data
  }
}
export const savedSearchInvoicePaginateLengthAction = (data) => {
  console.log("savedSearchInvoicePaginateLengthAction", data);
  return {
    type: "SEARCH_INVOICE_PAGINATE_LENGTH",
    payload: data
  }
}

// filterProduk
export const savedFilterInvoicePaginateAction = (data) => {
  console.log("FilterInvoiceAction", data);
  return {
    type: "FILTER_INVOICE_PAGINATE",
    payload: data
  }
}
export const savedFilterInvoicePaginateLengthAction = (data) => {
  console.log("savedFilterInvoicePaginateLengthAction", data);
  return {
    type: "FILTER_INVOICE_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTanggalASCProduk
export const savedInvoiceTanggalASCPaginateAction = (data) => {
  console.log("InvoiceTanggalASCPaginateAction", data);
  return {
    type: "INVOICE_TANGGAL_ASC_PAGINATE",
    payload: data
  }
}
export const savedInvoiceTanggalASCPaginateLengthAction = (data) => {
  console.log("savedInvoiceTanggalASCPaginateLengthAction", data);
  return {
    type: "INVOICE_TANGGAL_ASC_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTanggalDSCProduk
export const savedInvoiceTanggalDSCPaginateAction = (data) => {
  console.log("InvoiceTanggalDSCPaginateAction", data);
  return {
    type: "INVOICE_TANGGAL_DSC_PAGINATE",
    payload: data
  }
}
export const savedInvoiceTanggalDSCPaginateLengthAction = (data) => {
  console.log("savedInvoiceTanggalDSCPaginateLengthAction", data);
  return {
    type: "INVOICE_TANGGAL_DSC_PAGINATE_LENGTH",
    payload: data
  }
}


// InvoiceTotalASC
export const savedInvoiceTotalASCPaginateAction = (data) => {
  console.log("InvoiceTotalASCPaginateAction", data);
  return {
    type: "INVOICE_TOTAL_ASC_PAGINATE",
    payload: data
  }
}
export const savedInvoiceTotalASCPaginateLengthAction = (data) => {
  console.log("savedInvoiceTotalASCPaginateLengthAction", data);
  return {
    type: "INVOICE_TOTAL_ASC_PAGINATE_LENGTH",
    payload: data
  }
}

// InvoiceTotalDSC
export const savedInvoiceTotalDSCPaginateAction = (data) => {
  console.log("InvoiceTotalDSCPaginateAction", data);
  return {
    type: "INVOICE_TOTAL_DSC_PAGINATE",
    payload: data
  }
}
export const savedInvoiceTotalDSCPaginateLengthAction = (data) => {
  console.log("savedInvoiceTotalDSCPaginateLengthAction", data);
  return {
    type: "INVOICE_TOTAL_DSC_PAGINATE_LENGTH",
    payload: data
  }
}

export const getSalesInvoicePaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getSalesInvoicePaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoice?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getSalesInvoicePaginateAction`, res.data.salesByInvoicePaginate);

        dispatch(savedSalesInvoicePaginateAction(res.data.salesByInvoicePaginate));
        dispatch(savedSalesInvoicePaginateLengthAction(res.data.salesInvoicePaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSearchSalesInvoicePaginateAction = (page = 1, searchInvoice) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getSearchSalesInvoicePaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.post(`${API_URL}/salesReport/getSearchInvoice?_page=${page}`, {
          inputInvoice: searchInvoice
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getSearchInvoicePaginateAction`, res.data.searchInvoicePaginate);

        dispatch(savedSearchInvoicePaginateAction(res.data.searchInvoicePaginate));
        dispatch(savedSearchInvoicePaginateLengthAction(res.data.searchInvoicePaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }

}

////////////////////////////////// BELOM /////////////////
export const getFilterSalesInvoicePaginateAction = (page = 1, filterTanggalAkhir, filterTanggalAwal) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      console.log("props awal akhir", filterTanggalAkhir, "&", filterTanggalAwal)
      //^ cek ada token atau tidak
      console.log(`getFilterSalesInvoicePaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.post(`${API_URL}/salesReport/getFilterInvoice?_page=${page}`, {
          tanggalAwal: filterTanggalAwal,
          tanggalAkhir: filterTanggalAkhir
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {

          //^ cek isi res.data
          console.log(`res.data getFilterInvoicePaginateAction`, res.data.filterInvoicePaginate);

          dispatch(savedFilterInvoicePaginateAction(res.data.filterInvoicePaginate));
          dispatch(savedFilterInvoicePaginateLengthAction(res.data.filterInvoiceLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getInvoiceTanggalASCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getInvoiceTanggalASCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTanggalASC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getInvoiceTanggalASCPaginateAction`, res.data.invoiceTanggalASCPaginatedLength);

          dispatch(savedInvoiceTanggalASCPaginateAction(res.data.invoiceTanggalASCPaginated));
          dispatch(savedInvoiceTanggalASCPaginateLengthAction(res.data.invoiceTanggalASCLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getInvoiceTanggalDSCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getInvoiceTanggalDSCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTanggalDSC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getInvoiceTanggalDSCPaginateAction`, res.data.invoiceTanggalDSCPaginatedLength);

          dispatch(savedInvoiceTanggalDSCPaginateAction(res.data.invoiceTanggalDSCPaginated));
          dispatch(savedInvoiceTanggalDSCPaginateLengthAction(res.data.invoiceTanggalDSCLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getInvoiceTotalASCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getInvoiceTotalASCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTotalASC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getInvoiceTotalASCPaginateAction`, res.data.invoiceTotalASCPaginated);

          dispatch(savedInvoiceTotalASCPaginateAction(res.data.invoiceTotalASCPaginated));
          dispatch(savedInvoiceTotalASCPaginateLengthAction(res.data.invoiceTotalASCPaginateLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getInvoiceTotalDSCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getInvoiceTotalDSCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTotalDSC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getInvoiceTotalDSCPaginateAction`, res.data.invoiceTotalDSCPaginated);

          dispatch(savedInvoiceTotalDSCPaginateAction(res.data.invoiceTotalDSCPaginated));
          dispatch(savedInvoiceTotalDSCPaginateLengthAction(res.data.invoiceTotalDSCPaginateLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}