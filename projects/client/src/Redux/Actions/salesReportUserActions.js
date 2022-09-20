import Axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

// getUser
export const savedUserSalesReportPaginateAction = (data) => {
  console.log("UserSalesReportPaginateAction", data);
  return {
    type: "USER_SALES_REPORT_PAGINATE",
    payload: data
  }
}
export const savedUserSalesReportPaginateLengthAction = (data) => {
  console.log("savedUserSalesReportPaginateLengthAction", data);
  return {
    type: "USER_SALES_REPORT_PAGINATE_LENGTH",
    payload: data
  }
}

// searchUser
export const savedSearchUserPaginateAction = (data) => {
  console.log("SearchUserAction", data);
  return {
    type: "SEARCH_USER_PAGINATE",
    payload: data
  }
}
export const savedSearchUserPaginateLengthAction = (data) => {
  console.log("savedSearchUserPaginateLengthAction", data);
  return {
    type: "SEARCH_USER_PAGINATE_LENGTH",
    payload: data
  }
}

// userTotalASC
export const savedUserTotalASCPaginateAction = (data) => {
  console.log("UserTotalASCPaginateAction", data);
  return {
    type: "USER_TOTAL_ASC_PAGINATE",
    payload: data
  }
}
export const savedUserTotalASCPaginateLengthAction = (data) => {
  console.log("savedUserTotalASCPaginateLengthAction", data);
  return {
    type: "USER_TOTAL_ASC_PAGINATE_LENGTH",
    payload: data
  }
}

// userTotalASC
export const savedUserTotalDSCPaginateAction = (data) => {
  console.log("UserTotalDSCPaginateAction", data);
  return {
    type: "USER_TOTAL_DSC_PAGINATE",
    payload: data
  }
}
export const savedUserTotalDSCPaginateLengthAction = (data) => {
  console.log("savedUserTotalDSCPaginateLengthAction", data);
  return {
    type: "USER_TOTAL_DSC_PAGINATE_LENGTH",
    payload: data
  }
}

export const getUserSalesReportPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getUserSalesReportPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanUser?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getUserSalesReportPaginateAction`, res.data.dataUser);
          dispatch(savedUserSalesReportPaginateAction(res.data.dataUser));
          dispatch(savedUserSalesReportPaginateLengthAction(res.data.userPaginateLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSearchUserPaginateAction = (page = 1, searchUser) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      //^ cek ada token atau tidak
      console.log(`getSearchUserPaginateAction tokenIdUser`, token);
      console.log("CHECK SEARCHUsersss", searchUser)
      if (token) {
        let res = await Axios.post(`${API_URL}/salesReport/getSearchUser?_page=${page}`, {
          inputUser: searchUser
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          //^ cek isi res.data
          console.log(`res.data getSearchUserPaginateAction`, res.data.dataUser);

          dispatch(savedSearchUserPaginateAction(res.data.dataUser));
          dispatch(savedSearchUserPaginateLengthAction(res.data.searchUserPaginateLength));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getUserTotalASCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getUserTotalASCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanUserTotalASC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getUserTotalASCPaginateAction`, res.data.userASCPaginated);

        dispatch(savedUserTotalASCPaginateAction(res.data.userASCPaginated));
        dispatch(savedUserTotalASCPaginateLengthAction(res.data.userASCPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getUserTotalDSCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      console.log(`getUserTotalDSCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/salesReport/getLaporanUserTotalDSC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        console.log(`res.data getUserTotalDSCPaginateAction`, res.data.userDSCPaginated);

        dispatch(savedUserTotalDSCPaginateAction(res.data.userDSCPaginated));
        dispatch(savedUserTotalDSCPaginateLengthAction(res.data.userDSCPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}