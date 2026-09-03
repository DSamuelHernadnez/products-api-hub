import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductByIdAction } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {

   const { id } = useParams();
   const dispatch = useDispatch();
   const product = useSelector((state) => state.product);
   const [activeImage, setActiveImage] = useState("");

   useEffect(() => {
      dispatch(getProductByIdAction(id));
   }, [id, dispatch]);

   if (!product) return <h2>Cargando...</h2>;

   const {
      title,
      category,
      description,
      price,
      rating,
      stock,
      images,
   } = product;

   return (
      <main className={styles.detailMain}>
         <div className={styles.detailContainer}>

            <header className={styles.topAction}>
               <Link
                  to="/home"
                  className={styles.backBtn}
               >
                  ← VOLVER AL CATÁLOGO
               </Link>
            </header>

            <div className={styles.detailContent}>

               <div className={styles.carouselContainer}>

                  <div className={styles.mainImageWrapper}>
                     <img
                        src={activeImage || images[0]}
                        alt={title}
                        className={styles.productImg}
                     />
                  </div>

                  <div className={styles.thumbnailsContainer}>

                     {images.map((img) => (
                        <button
                           key={img}
                           className={`${styles.thumbnailBtn} ${
                              activeImage === img
                                 ? styles.activeThumb
                                 : ""
                           }`}
                           onClick={() => setActiveImage(img)}
                        >
                           <img
                              src={img}
                              alt={title}
                           />
                        </button>
                     ))}

                  </div>

               </div>

               <div className={styles.infoWrapper}>

                  <span className={styles.categoryBadge}>
                     {category}
                  </span>

                  <h1 className={styles.productTitle}>
                     {title}
                  </h1>

                  <div className={styles.metaInfo}>

                     <span className={styles.price}>
                        ${price}
                     </span>

                     <span className={styles.rating}>
                        ★ {rating}
                     </span>

                     <span className={styles.stock}>
                        Stock disponible: {stock} un.
                     </span>

                  </div>

                  <div className={styles.descriptionSection}>

                     <h3>[ DESCRIPCIÓN ]</h3>

                     <p className={styles.description}>
                        {description}
                     </p>

                  </div>

               </div>

            </div>

         </div>
      </main>
   );
};

export default Detail;