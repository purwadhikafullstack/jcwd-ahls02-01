
const INITIAL_STATE = {
    product: [],
    allProduct: []
  }
  
  export const productReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_PRODUCT":
        console.log("Data dari Product actions", { ...state, product: action.payload });
        return { ...state, product: action.payload };
  
      case "GET_ALLPRODUCT":
        console.log("Data dari All Product actions", action.payload);
        return { ...state, allProduct: action.payload };
  
      default:
        return state
    }
  }