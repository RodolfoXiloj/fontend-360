import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Box, MenuItem, Select, InputLabel, FormControl, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../models/User"; // Importa la interfaz User
import { fetchRoles } from "../../roles/services/roleServices";
import { getCustomers } from "../../customer/services/customerService";
import { fetchStates } from "../../state/services/stateService";
import { Role } from "../../roles/models/Role";
import { State } from "../../state/models/State";
import { Customer } from "../../customer/models/Customer";

interface UserFormProps {
  user?: User; // Si se pasa un usuario, el formulario será de edición
  onSubmit: (values: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [clients, setClients] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const rolesData = await fetchRoles();
      const statesData = await fetchStates();
      const clientsData = await getCustomers();
      setRoles(rolesData);
      setStates(statesData);
      setClients(clientsData);
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object({
    nombre_completo: Yup.string().required("Nombre completo es obligatorio"),
    correo_electronico: Yup.string().email("Correo inválido").required("Correo electrónico es obligatorio"),
    password: Yup.string().required("Contraseña es obligatoria"),
    id_rol: Yup.number().required("Rol es obligatorio"),
    id_estados: Yup.number().required("Estado es obligatorio"),
    id_clientes: Yup.number().required("Cliente es obligatorio"),
    telefono: Yup.string().required("Teléfono es obligatorio"),
  });

  return (
    <Formik
      initialValues={{
        id_usuarios: user?.id_usuarios || null,
        nombre_completo: user?.nombre_completo || "",
        correo_electronico: user?.correo_electronico || "",
        password: user?.password || "",
        id_rol: user?.id_rol || 0,
        id_estados: user?.id_estados || 0,
        id_clientes: user?.id_clientes || null,
        telefono: user?.telefono || "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Typography variant="h5" gutterBottom>{user ? "Editar Usuario" : "Crear Usuario"}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field name="nombre_completo" as={TextField} label="Nombre Completo" fullWidth />
              <ErrorMessage name="nombre_completo" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="correo_electronico" as={TextField} label="Correo Electrónico" fullWidth />
              <ErrorMessage name="correo_electronico" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="password" type="password" as={TextField} label="Contraseña" fullWidth />
              <ErrorMessage name="password" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  label="Rol"
                  name="id_rol"
                  value={values.id_rol ?? 0}
                  onChange={(e) => setFieldValue("id_rol", e.target.value)}
                >
                  {roles.map((role: any) => (
                    <MenuItem key={role.id_rol} value={role.id_rol}>
                      {role.nombre_rol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="id_rol" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  label="Estado"
                  name="id_estados"
                  value={values.id_estados ?? 0}
                  onChange={(e) => setFieldValue("id_estados", e.target.value)}
                >
                  {states.map((state: any) => (
                    <MenuItem key={state.id_estados} value={state.id_estados}>
                      {state.nombre_estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="id_estados" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Cliente</InputLabel>
                <Select
                  label="Cliente"
                  name="id_clientes"
                  value={values.id_clientes ?? 0}
                  onChange={(e) => setFieldValue("id_clientes", e.target.value)}
                >
                  {clients.map((client: any) => (
                    <MenuItem key={client.id_clientes} value={client.id_clientes}>
                      {client.nombre_comercial}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="id_clientes" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="telefono" as={TextField} label="Teléfono" fullWidth />
              <ErrorMessage name="telefono" component="div" className="error" />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button variant="contained" color="primary" type="submit">
                  {user ? "Actualizar" : "Crear"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
