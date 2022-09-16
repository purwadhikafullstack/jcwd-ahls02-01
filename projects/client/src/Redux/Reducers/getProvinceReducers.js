
const INITIAL_STATE = {
  getProvince: [],
  getProvince2: []
}

export const getProvinceReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PROVINCE":
      console.log("Data dari getProvince actions", action.payload);
      return { ...state, getProvince: action.payload };

    case "GET_PROVINCE2":
      console.log("getProvince2 actions", action.payload);
      return { ...state, getProvince2: action.payload };

    default:
      return state
  }
}