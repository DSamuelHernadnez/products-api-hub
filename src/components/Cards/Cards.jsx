import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ products }) => {
   return (
      <div className={styles.cardsGrid}>
         {products?.map((product) => (
            <Card
               ey={product.id}
               id={product.id}
               title={product.title}
               image={product.thumbnail || product.image}
               price={product.price}
               category={product.category}
               description={product.description} 
            />
         ))}
      </div>
   );
};

export default Cards;