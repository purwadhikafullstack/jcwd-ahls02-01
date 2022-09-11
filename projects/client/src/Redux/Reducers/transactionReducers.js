const INITIAL_STATE = {
    transaction: [],
}

export const transactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVED_TRANSACTION":
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS", action.payload)
            return { ...state, transaction: action.payload };

        default:
            return state
    }
}