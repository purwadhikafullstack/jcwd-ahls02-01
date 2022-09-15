import Axios from "axios"
// import { useNavigate } from "react-router-dom"
import { API_URL } from "../../helper"

//* SAVED SEMUA TRANSAKSI USER DI REDUCER -- U0
export const savedTransactionAction = (data) => {
    console.log("savedTransactionAction", data);

    return {
        type: "SAVED_TRANSACTION",
        payload: data
    }
}

//* SAVED USER VALIDASI RESEP ACTION -- U1
export const savedUserValidasiResepAction = (data) => {
    console.log("savedTransactionAdminAction", data);

    return {
        type: "USER_VALIDASI_RESEP",
        payload: data
    }
}

//* SAVED USER MENUNGGU PEMBAYARAN ACTION -- U2
export const savedUserMenungguPembayaranAction = (data) => {
    console.log("savedUserMenungguPembayaranAction", data);

    return {
        type: "USER_MENUNGGU_PEMBAYARAN",
        payload: data
    }
}

//* SAVED USER MENUNGGU KONFIRMASI ACTION -- U3
export const savedUserMenungguKonfirmasiAction = (data) => {
    console.log("savedUserMenungguKonfirmasiAction", data);

    return {
        type: "USER_MENUNGGU_KONFIRMASI",
        payload: data
    }
}

//* SAVED USER DIPROSES ACTION -- U4
export const savedUserDiprosesAction = (data) => {
    console.log("savedUserDiprosesAction", data);

    return {
        type: "USER_DIPROSES",
        payload: data
    }
}

//* SAVED USER DIKIRIM ACTION -- U5
export const savedUserDikirimAction = (data) => {
    console.log("savedUserDikirimAction", data);

    return {
        type: "USER_DIKIRIM",
        payload: data
    }
}

//* SAVED USER PESANAN DIKONFIRMASI ACTION -- U6
export const savedUserPesananDikonfirmasiAction = (data) => {
    console.log("savedUserPesananDikonfirmasiAction", data);

    return {
        type: "USER_PESANAN_DIKONFIRMASI",
        payload: data
    }
}

//* SAVED USER DIBATALKAN ACTION -- U7
export const savedUserDibatalkanAction = (data) => {
    console.log("savedUserDibatalkanAction", data);

    return {
        type: "USER_DIBATALKAN",
        payload: data
    }
}


//* GET SEMUA TRANSAKSI USER -- GET U1
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

//* GET TRANSAKSI USER VALIDASI RESEP -- GET U1A
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

//* GET TRANSAKSI USER VALIDASI RESEP TERFILTER DAN TERSORTIR -- GET U1B
export const getUserFilterValidasiResepAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterValidasiResep${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterValidasiResepAction`, res.data);

                dispatch(savedUserValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU PEMBAYARAN -- GET U2A
export const getUserMenungguPembayaranAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetMenungguPembayaran?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserMenungguPembayaranAction`, res.data);

                dispatch(savedUserMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU PEMBAYARAN TERFILTER DAN TERSORTIR -- GET U2B
export const getUserFilterMenungguPembayaranAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterValidasiMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterMenungguPembayaran${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterValidasiMenungguPembayaranAction`, res.data);

                dispatch(savedUserMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU KONFIRMASI -- GET U3A
export const getUserMenungguKonfirmasiAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetMenungguKonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserMenungguKonfirmasiAction`, res.data);

                dispatch(savedUserMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU KONFIRMASI TERFILTER DAN TERSORTIR -- GET U3B
export const getUserFilterMenungguKonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterMenungguKonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterMenungguKonfirmasiAction`, res.data);

                dispatch(savedUserMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIPROSES -- GET U4A
export const getUserDiprosesAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDiprosesAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDiproses?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDiprosesAction`, res.data);

                dispatch(savedUserDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIPROSES TERFILTER DAN TERSORTIR -- GET U4B
export const getUserFilterDiprosesAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDiprosesAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDiproses${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDiprosesAction`, res.data);

                dispatch(savedUserDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIKIRIM -- GET U5A
export const getUserDikirimAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDikirim?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDikirimAction`, res.data);

                dispatch(savedUserDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIKIRIM TERFILTER DAN TERSORTIR -- GET U5B
export const getUserFilterDikirimAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDikirim${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDikirimAction`, res.data);

                dispatch(savedUserDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER PESANAN DIKONFIRMASI -- GET U6A
export const getUserPesananDikonfirmasiAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetPesananDikonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserPesananDikonfirmasiAction`, res.data);

                dispatch(savedUserPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER PESANAN DIKONFIRMASI TERFILTER DAN TERSORTIR -- GET U6B
export const getUserFilterPesananDikonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterPesananDikonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterPesananDikonfirmasiAction`, res.data);

                dispatch(savedUserPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIBATALKAN -- GET U7A
export const getUserDibatalkanAction = (page=1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDibatalkan?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDibatalkanAction`, res.data);

                dispatch(savedUserDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIBATALKAN TERFILTER DAN TERSORTIR -- GET U7B
export const getUserFilterDibatalkanAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDibatalkan${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDibatalkanAction`, res.data);

                dispatch(savedUserDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//! ===============================================================

//* SAVED SEMUA TRANSAKSI ADMIN -- A0
export const savedTransactionAdminAction = (data) => {
    console.log("savedTransactionAdminAction", data);

    return {
        type: "SAVED_TRANSACTION_ADMIN",
        payload: data
    }
}

//* GET SEMUA TRANSAKSI ADMIN -- GET A1
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