import { GET_ALL_RECIPES, DELETE_RECIPE } from './actions';

const initialState = {
   recipes: [], // Estado global inicial donde almacenamos todas las recetas
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_RECIPES:
         return {
            ...state,
            recipes: action.payload,
         };

      case DELETE_RECIPE:
         return {
            ...state,
            // Filtramos el estado global removiendo la receta cuyo id coincida con el payload
            recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
         };

      default:
         return state;
   }
};

export default rootReducer;