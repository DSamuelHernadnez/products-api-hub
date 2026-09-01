// Types de acciones
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';

// Action Creator para guardar todos los productos obtenidos de GET /products
export const getAllProductsAction = (products) => {
   return {
      type: GET_ALL_PRODUCTS,
      payload: products,
   };
};

// Action Creator para eliminar el producto del estado global tras el DELETE /products/:id
export const deleteProductsAction = (id) => {
   return {
      type: DELETE_PRODUCTS,
      payload: id,
   };
};