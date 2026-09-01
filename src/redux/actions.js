// Types de acciones
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const DELETE_RECIPE = 'DELETE_RECIPE';

// Action Creator para guardar todas las recetas obtenidas de GET /recipes
export const getAllRecipesAction = (recipes) => {
   return {
      type: GET_ALL_RECIPES,
      payload: recipes,
   };
};

// Action Creator para eliminar la receta del estado global tras el DELETE /recipes/:id
export const deleteRecipeAction = (id) => {
   return {
      type: DELETE_RECIPE,
      payload: id,
   };
};