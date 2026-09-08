import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByIdAction } from '../../redux/actions';
import styles from './Detail.module.css';

const Detail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const product = useSelector((state) => state.product);

   useEffect(() => {
      dispatch(getProductByIdAction(id));
   }, [dispatch, id]);

   return (
      <div className={styles.detailMain}>
         <button onClick={() => navigate(-1)} className={styles.backBtn}>
            ← Volver
         </button>

         <div className={styles.detailContainer}>
            {/* Sección de la Imagen Única */}
            <div className={styles.imageSection}>
               <div className={styles.imageContainer}>
                  <img 
                     src={product?.image || product?.thumbnail || (product?.images && product?.images[0])} 
                     alt={product?.title} 
                     className={styles.mainImage}
                  />
               </div>
            </div>

            {/* Sección de Información del Producto */}
            <div className={styles.infoSection}>
               <span className={styles.categoryBadge}>{product?.category}</span>
               <h1 className={styles.productTitle}>{product?.title}</h1>
               
               <div className={styles.priceContainer}>
                  <span className={styles.productPrice}>${product?.price}</span>
                  {product?.discountPercentage && (
                     <span className={styles.discountBadge}>-{product?.discountPercentage}% OFF</span>
                  )}
               </div>

               <p className={styles.productDescription}>{product?.description}</p>

               <div className={styles.extraDetails}>
                  <div className={styles.detailItem}>
                     <span className={styles.detailLabel}>Marca:</span>
                     <span className={styles.detailValue}>{product?.brand || 'Genérica'}</span>
                  </div>
                  <div className={styles.detailItem}>
                     <span className={styles.detailLabel}>Stock disponible:</span>
                     <span className={styles.detailValue}>{product?.stock || 'Unidades limitadas'}</span>
                  </div>
                  <div className={styles.detailItem}>
                     <span className={styles.detailLabel}>Calificación:</span>
                     <span className={styles.detailValue}>⭐ {product?.rating || 'N/A'}</span>
                  </div>
               </div>

               <button className={styles.buyBtn} onClick={() => alert('¡Producto agregado al carrito/compra simulada!')}>
                  Comprar Ahora
               </button>
            </div>
         </div>
      </div>
   );
};

export default Detail;