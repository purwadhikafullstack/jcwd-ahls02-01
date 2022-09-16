const INITIAL_STATE = {
    cart: [],
    mainStock: []
}

export const cartReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVED_CART":
            console.log("HOLA ~ INI ISI DATA CART DR CART REDUCERS", action.payload)
            return { ...state, cart: action.payload };

        case "SAVED_MAIN_STOCK":
            console.log("HOLA ~ INI ISI DATA MAIN_STOCK DR CART REDUCERS", action.payload)
            return { ...state, mainStock: action.payload };

        default:
            return state
    }
}