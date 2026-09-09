import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { deleteProduct } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Card = ({ id, title, image, price, category, description }) => {
   const dispatch = useDispatch();
   const onClose = () => {
      dispatch(deleteProduct(id));
   };

   return (
      <article className={styles.cardContainer}>
         <button onClick={onClose} className={styles.closeBtn} title="Eliminar producto">
            X
         </button>
         <div className={styles.cardImageWrapper}>
            <img 
               src={image}
               alt={title} 
               className={styles.cardImg} 
            />
         </div>
         <div className={styles.cardContent}>
            <h3 className={styles.cardName}>{title}</h3>
            
            {/* Agregamos la descripción corta aquí */}
            <p className={styles.cardDescription}>
               {description || "Sin descripción disponible."}
            </p>

            <div className={styles.cardInfo}>
               <span className={styles.category}>
                  Categoría: {category}
               </span>
               <span className={styles.price}>
                  ${price}
               </span>
            </div>
            <Link to={`/product/${id}`} className={styles.detailBtn}>
               VER DETALLE
            </Link>
         </div>
      </article>
   );
};

export default Card;