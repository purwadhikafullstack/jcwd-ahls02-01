import Axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

// getProduct
export const savedSalesReportPaginateAction = (data) => {
  console.log("SalesReportPaginateAction", data);
  return {
    type: "SALES_REPORT_PAGINATE",
    payload: data
  }
}
export const savedSalesReportPaginateLengthAction = (data) => {
  console.log("savedSalesReportPaginateLengthAction", data);
  return {
    type: "SALES_REPORT_PAGINATE_LENGTH",
    payload: data
  }
}

// searchProduk
export const savedSearchPaginateAction = (data) => {
  console.log("ProductSearchAction", data);
  return {
    type: "SEARCH_PAGINATE",
    payload: data
  }
}
export const savedSearchPaginateLengthAction = (data) => {
  console.log("savedSearchPaginateLengthAction", data);
  return {
    type: "SEARCH_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTotalASCProduk
export const savedSortTotalASCPaginateAction = (data) => {
  console.log("SortTotalASCPaginateAction", data);
  return {
    type: "SORT_TOTAL_ASC_PAGINATE",
    payload: data
  }
}
export const savedSortTotalASCPaginateLengthAction = (data) => {
  console.log("savedSortTotalASCPaginateLengthAction", data);
  return {
    type: "SORT_TOTAL_ASC_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTanggalDSCProduk
export const savedSortTotalDSCPaginateAction = (data) => {
  console.log("SortTotalDSCPaginateAction", data);
  return {
    type: "SORT_TOTAL_DSC_PAGINATE",
    payload: data
  }
}
export const savedSortTotalDSCPaginateLengthAction = (data) => {
  console.log("savedSortTotalDSCPaginateLengthAction", data);
  return {
    type: "SORT_TOTAL_DSC_PAGINATE_LENGTH",
    payload: data
  }
}

export const getSalesReportPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getSalesReportPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanProduk?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getSalesReportPaginateAction`, res.data.namaObat);
        dispatch(savedSalesReportPaginateAction(res.data.namaObat));
        dispatch(savedSalesReportPaginateLengthAction(res.data.productPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSearchSalesReportPaginateAction = (page = 1, searchProduct) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      //^ cek ada token atau tidak
      console.log(`getSearchProductHistoryPaginateAction tokenIdUser`, token);
      console.log("CHECK SEARCHPRODUCT", searchProduct)
      if (token) {
        let res = await Axios.post(`${API_URL}/salesReport/getSearchProduct?_page=${page}`, {
          inputProduct: searchProduct
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getSearchPaginateAction`, res.data.namaObat);

          dispatch(savedSearchPaginateAction(res.data.namaObat));
          dispatch(savedSearchPaginateLengthAction(res.data.searchPaginateLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

}

export const getSortTotalASCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getSortTotalASCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanProdukTotalASC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getSortTotalASCPaginateAction`, res.data.productASCPaginated);

        dispatch(savedSortTotalASCPaginateAction(res.data.productASCPaginated));
        dispatch(savedSortTotalASCPaginateLengthAction(res.data.productASCPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSortTotalDSCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getSortTotalDSCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanProdukTotalDSC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getSortTotalDSCPaginateAction`, res.data.productDSCPaginated);

        dispatch(savedSortTotalDSCPaginateAction(res.data.productDSCPaginated));
        dispatch(savedSortTotalDSCPaginateLengthAction(res.data.productDSCPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}