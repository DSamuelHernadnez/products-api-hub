import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { deleteProductsAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Card = ({ id, title, image, price, category}) => {

   const dispatch = useDispatch();
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
      <article className={styles.cardContainer}>
         {/* Botón de cierre */}
         <button
            onClick={() => onClose(id)}
            className={styles.closeBtn}
            title="Eliminar producto"
         >
            X
         </button>

         <div className={styles.cardImageWrapper}>
            <img src={image} alt={title} className={styles.cardImg} />
         </div>

         <div className={styles.cardContent}>
            <h3 className={styles.cardName}>{title}</h3>

            <div className={styles.cardInfo}>
               <span className={styles.category}>Categoría: {category}</span>
               <span className={styles.price}>${price}</span>
            </div>

            <Link to={`/product/${id}`} className={styles.detailBtn}>
               VER DETALLE
            </Link>
         </div>
      </article>
   );
};

export default Card;