import { GET_ALL_PRODUCTS, DELETE_PRODUCTS, GET_BY_ID, SEARCH_PRODUCTS, CREATE_PRODUCTS } from './actions';

const initialState = {
   products: [], // Lista que va cambiando (se filtra o se eliminan elementos)
   allProducts: [], // Copia de respaldo fija con todos los productos originales de la API
   product: null, // Estado global inicial donde almacenamos todos los productos
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_PRODUCTS:
         return {
            ...state,
            products: action.payload,
            allProducts: action.payload
         };

      case GET_BY_ID:
         return {
            ...state,
            product: action.payload,
         };

      case DELETE_PRODUCTS:
         return {
            ...state,
            // Filtramos el estado global removiendo el producto cuyo id coincida con el payload
            products: state.products.filter((product) => product.id !== action.payload),
         };

      case SEARCH_PRODUCTS:
         // Filtramos sobre la copia de respaldo (allProducts) basándonos en el texto ingresado (payload)
         const filteredProducts = state.allProducts.filter((product) =>
            product.title.toLowerCase().includes(action.payload.toLowerCase())
         );
         return {
            ...state,
            products: filteredProducts,
         };
         
      case CREATE_PRODUCTS:
         return {
            ...state,
            products: [...state.products, action.payload],
            allProducts: [...state.allProducts, action.payload],
            product: action.payload,
         };

      default:
         return state;
   }
};

export default rootReducer;