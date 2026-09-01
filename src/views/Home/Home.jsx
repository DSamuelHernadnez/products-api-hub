import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import { getAllProductsAction, deleteProductsAction } from '../../redux/actions';
import styles from './Home.module.css';

const Home = () => {
   // Leemos los productos del estado global
   const products = useSelector((state) => state.products);
   const dispatch = useDispatch();

   // Obtener todos los productos desde la API de DummyJSON
   useEffect(() => {
      fetch('https://dummyjson.com/products')
         .then((res) => res.json())
         .then((data) => {
            // DummyJSON devuelve los productos dentro de la propiedad "products"
            dispatch(getAllProductsAction(data.products));
         });
   }, [dispatch]);

   // Eliminar un producto
   const onClose = (id) => {
      fetch(`https://dummyjson.com/products/${id}`, {
         method: 'DELETE',
      })
         .then((res) => res.json())
         .then(() => {
            dispatch(deleteProductsAction(id));
         });
   };

   return (
      <main className={styles.homeContainer}>
         <header className={styles.homeHeader}>
            <h1 className={styles.homeTitle}>EXPLORA NUESTROS PRODUCTOS</h1>
            <p className={styles.homeSubtitle}>Calidad y variedad excepcional</p>
         </header>
         
         {/* Pasamos los productos y la función onClose hacia Cards */}
         <Cards products={products} onClose={onClose} />
      </main>
   );
};

export default Home;