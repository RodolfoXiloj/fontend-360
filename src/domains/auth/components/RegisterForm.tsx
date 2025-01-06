import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { User } from "../models/User";
import { fetchRoles } from "../../roles/services/roleServices";
import { SelectChangeEvent } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import { Role } from "../../roles/models/Role";
import { Customer } from "../../customer/models/Customer";
import CustomerForm from "../../customer/components/CustomerForm";
import { createCustomer } from "../../customer/services/customerService";

const RegisterForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Omit<User, "id_usuarios">>({
    correo_electronico: "",
    nombre_completo: "",
    password: "",
    id_rol: 3,
    telefono: 0,
    fecha_nacimiento: "",
    id_estados: 1,
    id_clientes: null
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar roles desde el endpoint
    const loadRoles = async () => {
      try {
        const fetchedRoles = await fetchRoles(user?.id_rol);
        setRoles(fetchedRoles);
      } catch (err) {
        setError("Error al cargar los roles");
      }
    };
    loadRoles();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "telefono" ? Number(value) : value,
    });
  };
  
  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setFormData({
      ...formData,
      id_rol: Number(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(customerData && (formData.id_rol === 3 || !user)){
        const res = await createCustomer(customerData);
        console.log(res.id_cliente)
        setFormData({
          ...formData,
          id_clientes: res.id_cliente,
        });
      }
      
      await register(formData);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error durante el registro");
    }
  };

  const handleCustomerSubmit = (customer: Customer) => {
    setCustomerData(customer); // Almacena datos del cliente
  };

  console.log(customerData)

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre completo"
        name="nombre_completo"
        value={formData.nombre_completo}
        onChange={handleTextChange}
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        name="correo_electronico"
        value={formData.correo_electronico}
        onChange={handleTextChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleTextChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        label="Teléfono"
        type="number"
        name="telefono"
        value={formData.telefono}
        onChange={handleTextChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      <TextField
        label="Fecha de nacimiento"
        type="date"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleTextChange}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      {user?.id_rol == 1 && <FormControl fullWidth style={{ marginTop: "1rem" }}>
        <InputLabel>Rol</InputLabel>
        <Select
          name="id_rol"
          value={formData.id_rol}
          onChange={handleSelectChange}
        >
          {roles.map((role) => (
            <MenuItem key={role.id_rol} value={role.id_rol}>
              {role.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>}
      {(formData.id_rol === 3 || !user) && (
        <CustomerForm onSubmit={handleCustomerSubmit} />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;
