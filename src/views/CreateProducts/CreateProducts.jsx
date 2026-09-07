import Form from '../../components/Form/Form';
import styles from './CreateProducts.module.css';

const CreateProducts = () => {
   return (
      <main className={styles.createMain}>
         <div className={styles.createContainer}>
            <h1 className={styles.createTitle}>CREAR NUEVO PRODUCTO</h1>
            <Form />
         </div>
      </main>
   );
};

export default CreateProducts;