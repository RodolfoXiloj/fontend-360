import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "../models/User"; // Importa la interfaz User
import { getUsers, deactivateUser } from "../services/userService"; // Asumiendo que tienes un servicio para obtener y desactivar usuarios

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id: number) => {
    // Lógica para editar el usuario, puede ser redirigiendo al formulario o mostrando un modal
    console.log("Edit user", id);
  };

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateUser(id); // Llamar al servicio para desactivar el usuario
      setUsers((prevUsers) => prevUsers.map((user) => user.id_usuarios === id ? { ...user, id_estados: 2 } : user));
    } catch (error) {
      console.error("Error deactivating user", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Lista de Usuarios</Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id_usuarios}>
            <UserCard
              user={user}
              onEdit={handleEdit}
              onDeactivate={handleDeactivate}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserList;
