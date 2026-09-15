import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from '../../components/Filter/Filter';
import Paginated from '../../components/Paginated/Paginated';
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
         <Filter />
         <header className={styles.homeHeader}>
            <h1 className={styles.homeTitle}>
               EXPLORA NUESTROS PRODUCTOS
            </h1>
            <p className={styles.homeSubtitle}>
               Calidad y variedad excepcional
            </p>
         </header>
         <Paginated products={products} />

      </main>
   );
};

export default Home;