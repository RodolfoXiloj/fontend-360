// src/domains/products/components/ProductForm.tsx
import React from "react";
import { useFormik } from "formik";
import { productValidationSchema } from "../models/ProductValidation";
import { Product } from "../models/Product";
import { uploadImageToCloud } from "../../shared/services/storageServices";
import { createProduct, updateProduct } from "../services/productService";
import { Button, TextField, Grid } from "@mui/material";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmitSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmitSuccess }) => {
  const formik = useFormik({
    initialValues: initialProduct || {
      id_productos: null,
      id_categoria_productos: 0,
      nombre: "",
      marca: "",
      codigo: "",
      stock: 0,
      precio: 0,
      foto: null,
      id_estados: 1,
      id_usuarios: null,
      fecha_creacion: new Date().toISOString(),
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      try {
        const imageUrl = await uploadImageToCloud(values.foto as File);
        const productToSave = { ...values, foto: imageUrl };

        if (values.id_productos) {
          await updateProduct(values.id_productos, productToSave);
        } else {
          await createProduct(productToSave);
        }
        onSubmitSuccess();
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Marca"
            name="marca"
            value={formik.values.marca}
            onChange={formik.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Subir Foto
            <input
              type="file"
              hidden
              onChange={(event) => {
                formik.setFieldValue("foto", event.currentTarget.files?.[0]);
              }}
            />
          </Button>
          {formik.errors.foto && <div>{formik.errors.foto}</div>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {formik.values.id_productos ? "Actualizar" : "Agregar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
