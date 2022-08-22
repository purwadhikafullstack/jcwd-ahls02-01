import axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

export const loginAction = (data) => {
  console.log("data users loginAction", data)
  return {
    type: "LOGIN_SUCCESS",
    payload: data
  }
}

export const logoutAction = (data) => {
  localStorage.removeItem("tokenIdUser")
  return {
    type: "LOGOUT"
  }
}

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("token getItem", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/users/keepLogin`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // memeriksa adanya data user atau tidak
        // console.log("RES.DATA", res.data.token)
        console.log("RES.DATA TOKENS", res.data.token)
        if (res.data.token) {
          //
          localStorage.setItem("tokenIdUser", res.data.token)
          console.log("resdata keepLogin", res.data)
          dispatch(loginAction(res.data))
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}