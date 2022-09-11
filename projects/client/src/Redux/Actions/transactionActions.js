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