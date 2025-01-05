import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Customer } from "../models/Customer";

const CustomerForm: React.FC<{ onSubmit: (customer: Customer) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Customer>({
    id_clientes: null,
    razon_social: "",
    nombre_comercial: "",
    direccion_entrega: "",
    telefono: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Customer>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: Partial<Customer> = {};
    if (!formData.razon_social) newErrors.razon_social = "Razón social es requerida";
    if (!formData.nombre_comercial) newErrors.nombre_comercial = "Nombre comercial es requerido";
    if (!formData.direccion_entrega) newErrors.direccion_entrega = "Dirección de entrega es requerida";
    if (!formData.telefono) newErrors.telefono = "Teléfono es requerido";
    if (!formData.email) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Llamar onSubmit si la validación pasa
  useEffect(() => {
    if (validate()) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" mb={2}>
        Formulario de Cliente
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Razón Social"
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
            error={!!errors.razon_social}
            helperText={errors.razon_social}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre Comercial"
            name="nombre_comercial"
            value={formData.nombre_comercial}
            onChange={handleChange}
            error={!!errors.nombre_comercial}
            helperText={errors.nombre_comercial}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección de Entrega"
            name="direccion_entrega"
            value={formData.direccion_entrega}
            onChange={handleChange}
            error={!!errors.direccion_entrega}
            helperText={errors.direccion_entrega}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            error={!!errors.telefono}
            helperText={errors.telefono}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerForm;
