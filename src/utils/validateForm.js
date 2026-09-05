export const validateForm = (form) => {
   let errors = {};

   // 1. Validar Título
   if (!form.title) {
      errors.title = 'El título es obligatorio.';
   }

   // 2. Validar Precio
   if (!form.price) {
      errors.price = 'El precio es obligatorio.';
   }
   if (form.price && Number(form.price) <= 0) {
      errors.price = 'El precio debe ser mayor a 0.';
   }

   // 3. Validar Categoría
   if (!form.category) {
      errors.category = 'La categoría es obligatoria.';
   }

   // 4. Validar URL de la Imagen
   if (!form.image) {
      errors.image = 'La URL de la imagen es obligatoria.';
   }
   if (form.image && !URL.canParse(form.image)) {
      errors.image = 'Por favor ingresa una URL de imagen válida.';
   }

   return errors;
};