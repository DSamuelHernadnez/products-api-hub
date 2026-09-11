import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
   fetchCategories, 
   FILTER_BY_CATEGORY, 
   FILTER_BY_PRICE_RANGE, 
   ORDER_BY_PRICE, 
   ORDER_BY_NAME, 
   RESET_FILTERS 
} from '../../redux/actions';
import styles from './Filter.module.css';

const Filter = () => {
   const dispatch = useDispatch();

   // 1. Extraemos las categorías del estado global (igual que en tu Form)
   const categories = useSelector((state) => state.categories);

   // 2. Disparamos la acción al montar el componente para traer las categorías
   useEffect(() => {
      dispatch(fetchCategories());
   }, [dispatch]);

   // Estados locales para los inputs de precio mínimo y máximo
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');

   // Handlers para cada filtro y ordenamiento
   const handleCategoryChange = (e) => {
      dispatch({ type: FILTER_BY_CATEGORY, payload: e.target.value });
   };

   const handlePriceRangeApply = () => {
      dispatch({ type: FILTER_BY_PRICE_RANGE, payload: { min: minPrice, max: maxPrice } });
   };

   const handlePriceSort = (e) => {
      dispatch({ type: ORDER_BY_PRICE, payload: e.target.value });
   };

   const handleNameSort = (e) => {
      dispatch({ type: ORDER_BY_NAME, payload: e.target.value });
   };

   const handleReset = () => {
      setMinPrice('');
      setMaxPrice('');
      dispatch({ type: RESET_FILTERS });
   };

   return (
      <div className={styles.filterContainer}>
         
         {/* 1. Filtrar por Categoría (Con la misma lógica del Form) */}
         <div className={styles.filterGroup}>
            <label className={styles.label}>Categoría:</label>
            <select 
               onChange={handleCategoryChange} 
               className={styles.selectInput}
            >
               <option value="All">Todas las categorías</option>
               {categories.map((category) => (
                  <option key={category} value={category}>
                     {category}
                  </option>
               ))}
            </select>
         </div>

         {/* 2. Filtrar por Rango de Precios (con min="0" para evitar negativos) */}
         <div className={styles.filterGroup}>
            <label className={styles.label}>Precio:</label>
            <input 
               type="number" 
               placeholder="Mín" 
               min="0"
               value={minPrice} 
               onChange={(e) => setMinPrice(e.target.value)} 
               className={styles.inputPrice}
            />
            <input 
               type="number" 
               placeholder="Máx" 
               min="0"
               value={maxPrice} 
               onChange={(e) => setMaxPrice(e.target.value)} 
               className={styles.inputPrice}
            />
            <button onClick={handlePriceRangeApply} className={styles.btnAction}>Filtrar</button>
         </div>

         {/* 3. Ordenamiento por Precio */}
         <div className={styles.filterGroup}>
            <label className={styles.label}>Precio:</label>
            <select onChange={handlePriceSort} defaultValue="" className={styles.selectInput}>
               <option value="" disabled>Ordenar por precio</option>
               <option value="asc">Menor a Mayor ($)</option>
               <option value="desc">Mayor a Menor ($)</option>
            </select>
         </div>

         {/* 4. Ordenamiento Alfabético */}
         <div className={styles.filterGroup}>
            <label className={styles.label}>Alfabético:</label>
            <select onChange={handleNameSort} defaultValue="" className={styles.selectInput}>
               <option value="" disabled>Ordenar por nombre</option>
               <option value="az">A - Z</option>
               <option value="za">Z - A</option>
            </select>
         </div>

         {/* Botón de Reset */}
         <button onClick={handleReset} className={styles.resetBtn}>
            Resetear
         </button>

      </div>
   );
};

export default Filter;