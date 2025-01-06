import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Customer } from "../models/Customer";

interface CustomerFormProps {
  onSubmit: (customer: Omit<Customer, "id_clientes">) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<Omit<Customer, "id_clientes">>({
    razon_social: "",
    nombre_comercial: "",
    direccion_entrega: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="razon_social"
        label="Razón Social"
        value={form.razon_social}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="nombre_comercial"
        label="Nombre Comercial"
        value={form.nombre_comercial}
        onChange={handleChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        name="direccion_entrega"
        label="Dirección de Entrega"
        value={form.direccion_entrega}
        onChange={handleChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        name="telefono"
        label="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Guardar
      </Button>
    </form>
  );
};
