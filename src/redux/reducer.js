import { GET_ALL_PRODUCTS, DELETE_PRODUCTS } from './actions';

const initialState = {
   products: [], // Estado global inicial donde almacenamos todos los productos
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_PRODUCTS:
         return {
            ...state,
            products: action.payload,
         };

      case DELETE_PRODUCTS:
         return {
            ...state,
            // Filtramos el estado global removiendo el producto cuyo id coincida con el payload
            products: state.products.filter((product) => product.id !== action.payload),
         };

      default:
         return state;
   }
};

export default rootReducer;