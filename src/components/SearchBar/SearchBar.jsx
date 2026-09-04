import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchProductsAction } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
   const [searchString, setSearchString] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Actualiza el estado y detecta si se limpió el input con la "x"
   const handleChange = (event) => {
      setSearchString(event.target.value);

      // Si el usuario borra todo o hace clic en la "x" nativa del buscador y redirije al Home:
      if (event.target.value === '') {
         dispatch(searchProductsAction(''));
         navigate('/home');
      }
   };

   // Dispara la búsqueda al hacer clic en el botón
   const handleSearch = () => {
      if (searchString.length > 0) {
         dispatch(searchProductsAction(searchString));
      }
   };

   return (
      <div className={styles.bar}>
         <input
            type="search"
            placeholder="Buscar producto..."
            value={searchString}
            onChange={handleChange}
            className={styles.searchInput}
         />
         <button onClick={handleSearch} className={styles.searchButton}>
            Buscar
         </button>
      </div>
   );
};

export default SearchBar;