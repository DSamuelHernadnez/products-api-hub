// Types de acciones
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const GET_BY_ID = 'GET_BY_ID';
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';

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
      fetch(`${process.env.REACT_APP_API_URL}/products`)
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

// Action Creator para eliminar un producto desde la API
export const deleteProduct = (id) => {
   return (dispatch) => {
      fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
         method: 'DELETE',
      })
         .then((response) => response.json())
         .then(() => {
            dispatch(deleteProductsAction(id));
         });
   };
};

// Action Creator para obtener un producto por ID
export const getProductByIdSuccess = (product) => {
   return {
      type: GET_BY_ID,
      payload: product,
   };
};

// Obtener un producto por ID 
// (buscando primero localmente en el Estado Global y luego en la API)
export const getProductByIdAction = (id) => {
   return (dispatch, getState) => {
      
      // 1. Buscamos en el estado global si ya existe el producto
      const state = getState();
      const foundProduct = state.allProducts.find(product => product.id === id);

      // 2. Si lo encuentra en la memoria, lo manda al reducer y termina
      if (foundProduct) {
         dispatch({
            type: GET_BY_ID,
            payload: foundProduct
         });
         return;
      }

      // 3. Si no está en el estado, lo busca en la API con un fetch normal
      fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
         .then(response => response.json())
         .then(data => {
            dispatch({
               type: GET_BY_ID,
               payload: data
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

// Action Creator asíncrono para crear un producto en la API (POST)  - Mostrandola en nuestra  Home.
export const createProduct = (productData) => (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    })
        .then((response) => response.json())
        .then((data) => {
            const completeProduct = {
                ...productData,
                id: data.id,
            };
            dispatch(createProductsAction(completeProduct));
        });
    return
};

// Action Creator para buscar producto
export const searchProductsAction = (productsQuery) => {
   return {
      type: SEARCH_PRODUCTS,
      payload: productsQuery,
   };
};



// Action Creator para guardar las categorías en el estado global
export const getCategoriesAction = (categories) => {
   return {
      type: GET_CATEGORIES,
      payload: categories,
   };
};

// Action Creator asíncrono para obtener las categorías de la API
export const fetchCategories = () => {
   return (dispatch) => {
      fetch(`${process.env.REACT_APP_API_URL}/products/categories`)
         .then((response) => response.json())
         .then((data) => {
            const cleanCategories = data.map((category) => {
               return typeof category === 'object' ? category.name : category; 
            });
            
            dispatch(getCategoriesAction(cleanCategories));
         });
   };
};