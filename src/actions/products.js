export const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    return fetch('/api/products')
      .then(res => res.json())
      .then(response => dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.products }))
  }
}