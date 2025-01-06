import * as Yup from "yup";

// Validación para el formulario de usuario
export const userValidationSchema = Yup.object({
  nombre_completo: Yup.string().required("Este campo es obligatorio"),
  correo_electronico: Yup.string()
    .email("Correo no válido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Este campo es obligatorio"),
  telefono: Yup.string(),
  fecha_nacimiento: Yup.date(),
  id_rol: Yup.number().required("Selecciona un rol"),
  id_estados: Yup.number().required("Selecciona un estado"),
});
