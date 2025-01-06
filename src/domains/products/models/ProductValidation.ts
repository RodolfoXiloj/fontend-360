import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  id_categoria_productos: Yup.number().required("La categoría es obligatoria"),
  stock: Yup.number()
    .required("El stock es obligatorio")
    .min(0, "El stock no puede ser negativo"),
  precio: Yup.number()
    .required("El precio es obligatorio")
    .min(0, "El precio no puede ser negativo"),
  foto: Yup.mixed<File>()
    .required("La foto es obligatoria")
    .test("fileType", "Formato no válido", (value) => {
      return value ? ["image/jpeg", "image/png"].includes(value.type) : false;
    }),
});
