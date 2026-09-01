import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ products}) => {
   return (
      <div className={styles.cardsGrid}>
         {products?.map((product) => (
            <Card
               key={product.id}
               id={product.id}
               title={product.title}
               image={product.thumbnail} 
               price={product.price}
               category={product.category}
            />
         ))}
      </div>
   );
};

export default Cards;