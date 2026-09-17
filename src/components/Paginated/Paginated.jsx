import { useState, useEffect } from 'react'; 
import Cards from '../Cards/Cards';
import styles from './Paginated.module.css';

const Paginated = ({ products }) => {
   const [currentPage, setCurrentPage] = useState(1); 
   
   useEffect(() => {
      setCurrentPage(1);
   }, [products]);

   const productsPerPage = 12;
   const lastIndex = currentPage * productsPerPage;
   const firstIndex = lastIndex - productsPerPage;
   const currentProducts = products.slice(firstIndex, lastIndex);
   const totalPages = Math.ceil(products.length / productsPerPage);


   // Creamos un array con los números de página (ej. [1, 2, 3, 4...])
   const pageNumbers = [];
   for (let i = 1; i <= totalPages; i++) {
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

         {/* Controles de Paginación Numérica */}
         <div className={styles.pagination}>
            <button
               onClick={previousPage}
               disabled={currentPage === 1}
            >
               Anterior
            </button>

            {/* Iteramos para mostrar los botones numéricos */}
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