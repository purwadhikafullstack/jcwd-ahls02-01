
const INITIAL_STATE = {
  getCity: [],
  getCity2: []
}

export const getCityReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_CITY":
      console.log("Data dari getCity actions", action.payload);
      return { ...state, getCity: action.payload };

    case "GET_CITY2":
      console.log("getCity2 actions", action.payload);
      return { ...state, getCity2: action.payload };

    default:
      return state
  }
}