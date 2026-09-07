import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/actions';
import { validateForm } from '../../utils/validateForm';
import styles from './Form.module.css';

const Form = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

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
               value={form.price}
               onChange={handleChange}
               className={styles.inputField}
            />
            {errors.price && <span className={styles.error}>{errors.price}</span>}
         </div>

         <div className={styles.inputGroup}>
            <label className={styles.label}>Categoría:</label>
            <input
               type="text"
               name="category"
               value={form.category}
               onChange={handleChange}
               className={styles.inputField}
            />
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

         <button
            type="submit"
            disabled={Object.keys(errors).length > 0 || form.title === ''}
            className={styles.submitBtn}
         >
            Crear Producto
         </button>
      </form>
   );
};

export default Form;