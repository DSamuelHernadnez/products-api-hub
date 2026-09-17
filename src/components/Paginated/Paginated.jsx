import { useState, useEffect } from 'react'; // 1. Importamos useEffect
import Cards from '../Cards/Cards';
import styles from './Paginated.module.css';

const Paginated = ({ products }) => {
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      setCurrentPage(1);
   }, [products]);

   const productsPerPage = 8;
   const lastIndex = currentPage * productsPerPage;
   const firstIndex = lastIndex - productsPerPage;
   const currentProducts = products.slice(firstIndex, lastIndex);
   const totalPages = Math.ceil(products.length / productsPerPage);

   // Lógica de ventana deslizante de 3 en 3 
   const maxVisiblePages = 3;
   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
   let endPage = startPage + maxVisiblePages - 1;

   if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
   }

   const pageNumbers = [];
   for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
   }

   const nextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const previousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   return (
      <main className={styles.homeContainer}>
         {/* Renderizamos solo los productos de la página actual */}
         <Cards products={currentProducts} />

         {/* Controles de Paginación */}
         <div className={styles.pagination}>
            <button
               onClick={previousPage}
               disabled={currentPage === 1}
            >
               Anterior
            </button>

            {startPage > 1 && (
               <>
                  <button onClick={() => setCurrentPage(1)}>1</button>
                  {startPage > 2 && <span className={styles.dots}>...</span>}
               </>
            )}

            {pageNumbers.map((number) => (
               <button
                  key={number}
                  onClick={() => {
                     setCurrentPage(number);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={currentPage === number ? styles.active : ''}
               >
                  {number}
               </button>
            ))}

            {endPage < totalPages && (
               <>
                  {endPage < totalPages - 1 && <span className={styles.dots}>...</span>}
                  <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
               </>
            )}

            <button
               onClick={nextPage}
               disabled={currentPage === totalPages || totalPages === 0}
            >
               Siguiente
            </button>
         </div>
      </main>
   );
};

export default Paginated;