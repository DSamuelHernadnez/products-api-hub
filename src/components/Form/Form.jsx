import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, fetchCategories } from '../../redux/actions';
import { validateForm } from '../../utils/validateForm';
import styles from './Form.module.css';

const Form = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // 1. Extraemos las categorías del estado global
   const categories = useSelector((state) => state.categories);

   // 2. Disparamos la acción al montar el componente para traer las categorías
   useEffect(() => {
      dispatch(fetchCategories());
   }, [dispatch]);

   const [form, setForm] = useState({
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
   });

   const [errors, setErrors] = useState({});

   const handleChange = (event) => {
      const property = event.target.name;
      const value = event.target.value;

      const updatedForm = {
         ...form,
         [property]: value,
      };

      setForm(updatedForm);
      setErrors(validateForm(updatedForm));
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      const validationErrors = validateForm(form);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
         return;
      }

      dispatch(createProduct(form, navigate));

      // Limpiamos el formulario y los errores para dejarlos en blanco
      setForm({
         title: '',
         price: '',
         category: '',
         description: '',
         image: '',
      });
      setErrors({});
   };

   return (
      <form onSubmit={handleSubmit} className={styles.formContainer}>
         <div className={styles.inputGroup}>
            <label className={styles.label}>Título:</label>
            <input
               type="text"
               name="title"
               value={form.title}
               onChange={handleChange}
               className={styles.inputField}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
         </div>

         <div className={styles.inputGroup}>
            <label className={styles.label}>Precio:</label>
            <input
               type="number"
               name="price"
               min="1"
               value={form.price}
               onChange={handleChange}
               className={styles.inputField}
            />
            {errors.price && <span className={styles.error}>{errors.price}</span>}
         </div>

         {/* Selector de Categoría desplegable */}
         <div className={styles.inputGroup}>
            <label className={styles.label}>Categoría:</label>
            <select
               name="category"
               value={form.category}
               onChange={handleChange}
               className={styles.inputField}
            >
               <option value="">Selecciona una categoría</option>
               {categories.map((category) => (
                  <option key={category} value={category}>
                     {category}
                  </option>
               ))}
            </select>
            {errors.category && <span className={styles.error}>{errors.category}</span>}
         </div>

         <div className={styles.inputGroup}>
            <label className={styles.label}>Descripción:</label>
            <textarea
               name="description"
               value={form.description}
               onChange={handleChange}
               className={styles.textareaField}
            />
         </div>

         <div className={styles.inputGroup}>
            <label className={styles.label}>URL de Imagen:</label>
            <input
               type="text"
               name="image"
               value={form.image}
               onChange={handleChange}
               className={styles.inputField}
            />
            {errors.image && <span className={styles.error}>{errors.image}</span>}
         </div>

         <button type="submit" className={styles.submitBtn}>
            Crear Producto
         </button>
      </form>
   );
};

export default Form;