
const INITIAL_STATE = {
  getCity: []
}

export const getCityReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_CITY":
      console.log("Data dari getCity actions", action.payload);
      return { ...state, getCity: action.payload };

    default:
      return state
  }
}