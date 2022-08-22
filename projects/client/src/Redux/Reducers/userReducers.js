
const INITIAL_STATE = {
  users: []
}

export const userReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Data loginAction userReducers", action.payload)
      return { ...state, ...action.payload };

    case "LOGOUT":
      return INITIAL_STATE;

    default:
      return state
  }
}