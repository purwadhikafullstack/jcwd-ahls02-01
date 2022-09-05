
const INITIAL_STATE = {
  address: []
}

export const addressReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ADDRESS":
      console.log("Data dari address actions", action.payload);
      return { ...state, address: action.payload };

    default:
      return state
  }
}