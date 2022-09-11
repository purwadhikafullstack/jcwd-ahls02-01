const INITIAL_STATE = {
    transaction: [],
    transactionAdminView: []
}

export const transactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVED_TRANSACTION":
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS", action.payload)
            return { ...state, transaction: action.payload };

        case "SAVED_TRANSACTION_ADMIN":
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS KHUSUS ADMIN", action.payload)
            return { ...state, transactionAdminView: action.payload };

        default:
            return state
    }
}