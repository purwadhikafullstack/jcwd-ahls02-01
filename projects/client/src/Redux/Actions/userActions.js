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