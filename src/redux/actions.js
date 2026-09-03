// Types de acciones
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const GET_BY_ID = 'GET_BY_ID';
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

// Action Creator para guardar todos los productos obtenidos de GET /products
export const getAllProductsAction = (products) => {
   return {
      type: GET_ALL_PRODUCTS,
      payload: products,
   };
};

// Action Creator que consume la API
export const getProducts = () => {
   return (dispatch) => {
      fetch('https://dummyjson.com/products')
         .then((response) => response.json())
         .then((data) => {
            dispatch(getAllProductsAction(data.products));
         })
   };
};
// Action Creator para eliminar el producto del estado global tras el DELETE /products/:id
export const deleteProductsAction = (id) => {
   return {
      type: DELETE_PRODUCTS,
      payload: id,
   };
};

// Action Creator para obtener un producto por ID
export const getByAction = (id) => {
   return {
      type: GET_BY_ID,
      payload: id,
   };
};

// Obtener un producto por ID desde la API
export const getProductByIdAction = (id) => {
   return (dispatch) => {
      fetch(`https://dummyjson.com/products/${id}`)
         .then((response) => response.json())
         .then((data) => {
            dispatch({
               type: GET_BY_ID,
               payload: data,
            });
         });
   };
};

// Action Creator para crear un producto
export const createProductsAction = (products) => {
   return {
      type: CREATE_PRODUCTS,
      payload: products,
   };
};

// Action Creator para buscar producto
export const searchProductsAction = (productsQuery) => {
   return {
      type: SEARCH_PRODUCTS,
      payload: productsQuery,
   };
};