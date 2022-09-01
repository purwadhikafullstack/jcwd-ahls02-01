export const getProductsAction = (data) => {
    console.log("DATA DARI COMPONENT UI", data)
    return {
        type: "GET_PRODUCTS",
        payload: data
    }
}