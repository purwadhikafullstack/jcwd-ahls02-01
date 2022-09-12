
const INITIAL_STATE = {
    getCost: {},
    getCost2: {}
}

export const getCostReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_COST":
            console.log("Data dari getCost actions tersimpan", action.payload);
            return { ...state, getCost: action.payload };

        case "GET_COST2":
            console.log("Data dari getCost2 actions tersimpan", action.payload);
            return { ...state, getCost2: action.payload };

        default:
            return state
    }
}