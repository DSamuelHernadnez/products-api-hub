import {
   GET_ALL_PRODUCTS,
   DELETE_PRODUCTS,
   GET_BY_ID, SEARCH_PRODUCTS,
   CREATE_PRODUCTS,
   GET_CATEGORIES,
   FILTER_BY_CATEGORY,
   FILTER_BY_PRICE_RANGE,
   ORDER_BY_PRICE,
   ORDER_BY_NAME,
   RESET_FILTERS
} from './actions';

const initialState = {
   products: [], // Lista que va cambiando (se filtra o se eliminan elementos)
   allProducts: [], // Copia de respaldo fija con todos los productos originales de la API
   product: null, // Estado global inicial donde almacenamos todos los productos
   categories: [],
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

      case GET_CATEGORIES:
         return {
            ...state,
            categories: action.payload,
         };

      // 1. FILTRAR POR CATEGORÍA
      case FILTER_BY_CATEGORY:
         const categoryFiltered = action.payload === 'All'
            ? state.allProducts 
            : state.allProducts.filter((product) => product.category === action.payload);
         return {
            ...state,
            products: categoryFiltered,
         };

      // 2. FILTRAR POR PRECIO MÍNIMO Y MÁXIMO
      case FILTER_BY_PRICE_RANGE:
         const { min, max } = action.payload;
         const priceFiltered = state.allProducts.filter((product) => {
            const matchesMin = min !== '' ? product.price >= Number(min) : true;
            const matchesMax = max !== '' ? product.price <= Number(max) : true;
            return matchesMin && matchesMax;
         });
         return {
            ...state,
            products: priceFiltered,
         };

         // 3. ORDENAMIENTO POR PRECIO (Menor a mayor / Mayor a menor)
      case ORDER_BY_PRICE:
         const sortedByPrice = [...state.products].sort((a, b) => {
            if (action.payload === 'asc') return a.price - b.price; // Menor a mayor
            if (action.payload === 'desc') return b.price - a.price; // Mayor a menor
            return 0;
         });
         return {
            ...state,
            products: sortedByPrice,
         };

         // 4. ORDENAMIENTO ALFABÉTICO (A-Z / Z-A)
      case ORDER_BY_NAME:
         const sortedByName = [...state.products].sort((a, b) => {
            if (action.payload === 'az') return a.title.localeCompare(b.title);
            if (action.payload === 'za') return b.title.localeCompare(a.title);
            return 0;
         });
         return {
            ...state,
            products: sortedByName,
         };

         // 5. BOTÓN DE RESET (Restaura todo al estado original de la API)
      case RESET_FILTERS:
         return {
            ...state,
            products: state.allProducts,
         };

      default:
         return state;
   }
};

export default rootReducer;