import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import { getProducts } from '../../redux/actions';
import styles from './Home.module.css';

const Home = () => {

   const products = useSelector((state) => state.products);
   const dispatch = useDispatch();

   useEffect(() => {
  if (products.length === 0) {
         dispatch(getProducts());
      }
   }, [dispatch, products.length]);

   return (
      <main className={styles.homeContainer}>
         <header className={styles.homeHeader}>
            <h1 className={styles.homeTitle}>
               EXPLORA NUESTROS PRODUCTOS
            </h1>

            <p className={styles.homeSubtitle}>
               Calidad y variedad excepcional
            </p>
         </header>

         <Cards products={products} />
      </main>
   );
};

export default Home;