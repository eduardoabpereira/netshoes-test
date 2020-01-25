export const products = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_BEGIN':
      return {
        ...state,
        products: []
      }
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default products;