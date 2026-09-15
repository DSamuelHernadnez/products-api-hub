import { useState } from 'react';
import Cards from '../Cards/Cards';
import styles from './Paginated.module.css';

const Paginated = ({ products }) => {
   const [currentPage, setCurrentPage] = useState(1);

   const productsPerPage = 10;
   const lastIndex = currentPage * productsPerPage;
   const firstIndex = lastIndex - productsPerPage;
   const currentProducts = products.slice(firstIndex, lastIndex);
   const totalPages = Math.ceil(products.length / productsPerPage);

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

            <span>
               Página {currentPage} de {totalPages || 1}
            </span>

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