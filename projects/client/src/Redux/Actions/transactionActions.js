import Axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

//* storing transaction data into reducer
export const savedTransactionAction = (data) => {
    console.log("savedTransactionAction", data);

    return {
        type: "SAVED_TRANSACTION",
        payload: data
    }
}

export const savedTransactionAdminAction = (data) => {
    console.log("savedTransactionAdminAction", data);

    return {
        type: "SAVED_TRANSACTION_ADMIN",
        payload: data
    }
}

export const savedUserValidasiResepAction = (data) => {
    console.log("savedTransactionAdminAction", data);

    return {
        type: "USER_VALIDASI_RESEP",
        payload: data
    }
}

//* initially get transaction's cart info
//* also use for getting the latest user's transaction info
export const getTransactionAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getTransactionAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetAllTransaction`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getTransactionAction`, res.data);

                dispatch(savedTransactionAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getTransactionAdminAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getTransactionAdminAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetAllTransaction`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getTransactionAdminAction`, res.data);

                dispatch(savedTransactionAdminAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserValidasiResepAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetValidasiResep?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserValidasiResepAction`, res.data);

                dispatch(savedUserValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}