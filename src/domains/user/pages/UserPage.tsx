import React, { useState } from "react";
import { Container, Button, Box } from "@mui/material";
import { User } from "../models/User"; // Importa la interfaz User
import { addUser, updateUser } from "../services/userService"; // Servicios para crear y actualizar usuarios
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserFom";
import UserList from "../components/UserList";

const UserPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (values: User) => {
    try {
      if (selectedUser) {
        await updateUser(values); // Actualiza el usuario
      } else {
        await addUser(values); // Crea un nuevo usuario
      }
      navigate("/users"); // Redirige a la lista de usuarios
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  /* const handleEdit = (user: User) => {
    setSelectedUser(user);
  }; */

  return (
    <Container>
      {/* <Box sx={{ marginBottom: "1rem" }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedUser(undefined)}>
          Crear Usuario
        </Button>
      </Box> */}
      <UserForm user={selectedUser} onSubmit={handleSubmit} />
      <UserList />
    </Container>
  );
};

export default UserPage;
