import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { User } from "../models/User"; // Importa la interfaz User

interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
  onDeactivate: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDeactivate }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Nombre: {user.nombre_completo}</Typography>
            <Typography variant="body2" color="textSecondary">Correo: {user.correo_electronico}</Typography>
            <Typography variant="body2" color="textSecondary">Teléfono: {user.telefono}</Typography>
            <Typography variant="body2" color="textSecondary">Rol: {user.id_rol === 1 ? "Cliente" : "Operador"}</Typography>
            <Typography variant="body2" color="textSecondary">Estado: {user.id_estados === 1 ? "Activo" : "Inactivo"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} container spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth color="primary" onClick={() => onEdit(user.id_usuarios || 0)}>
                Editar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth color="secondary" onClick={() => onDeactivate(user.id_usuarios || 0)}>
                {user.id_estados === 1 ? "Desactivar" : "Activar"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
