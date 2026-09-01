// import { useEffect, useState } from 'react';
// import Cards from '../../components/Cards/Cards';
// import styles from './Home.module.css';

// const Home = () => {
//    const [recipes, setRecipes] = useState([]);

//    useEffect(() => {
//       fetch('https://dummyjson.com/recipes')
//          .then((res) => res.json())
//          .then((data) => {
//             const recipesArray = data.recipes || data;
//             if (Array.isArray(recipesArray) && recipesArray.length > 0) {
//                setRecipes(recipesArray);
//             } 
//          })
//       return () => setRecipes([]);
//    }, []);

//    // Función para eliminar/cerrar una tarjeta
//    const onClose = (id) => {
//       const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
//       setRecipes(filteredRecipes);
//    };

//    return (
//       <main className={styles.homeContainer}>
//          <header className={styles.homeHeader}>
//             <h1 className={styles.homeTitle}>EXPLORA NUESTRAS RECETAS</h1>
//             <p className={styles.homeSubtitle}>Alta cocina y sabores excepcionales</p>
//          </header>
         
//          {/* Pasamos la función onClose hacia Cards */}
//          <Cards recipes={recipes} onClose={onClose} />
//       </main>
//    );
// };

// export default Home;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import { getAllRecipesAction, deleteRecipeAction } from '../../redux/actions';
import styles from './Home.module.css';

const Home = () => {
   // Leemos las recetas del estado global
   const recipes = useSelector((state) => state.recipes);
   const dispatch = useDispatch();

   // Obtener todas las recetas
   useEffect(() => {
      fetch('https://dummyjson.com/recipes')
         .then((res) => res.json())
         .then((data) => {
            dispatch(getAllRecipesAction(data.recipes));
         });
   }, [dispatch]);

   // Eliminar una receta
   const onClose = (id) => {
      fetch(`https://dummyjson.com/recipes/${id}`, {
         method: 'DELETE',
      })
         .then((res) => res.json())
         .then(() => {
            dispatch(deleteRecipeAction(id));
         });
   };

   return (
      <main className={styles.homeContainer}>
         <header className={styles.homeHeader}>
            <h1 className={styles.homeTitle}>EXPLORA NUESTRAS RECETAS</h1>
            <p className={styles.homeSubtitle}>Alta cocina y sabores excepcionales</p>
         </header>
         
         {/* Pasamos la función onClose hacia Cards */}
         <Cards recipes={recipes} onClose={onClose} />
      </main>
   );
};

export default Home;
