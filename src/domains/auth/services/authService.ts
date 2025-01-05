
import apiClient from "../../../app/apiClient";
import { User } from "../models/User";

// Función para iniciar sesión
export const login = async (correo_electronico: string, password: string): Promise<User> => {
  const response = await apiClient.post("auth/login", { correo_electronico, password });
  const token = response.data.token; // Asumiendo que el token de usuario viene en la respuesta
  localStorage.setItem("jwtToken", token); // Guarda el token del usuario para futuras solicitudes
  return response.data.user; // Devuelve el usuario u otra información
};

// Función para registrarse
export const register = async (user:Omit<User, "id_usuarios">): Promise<User> => {
  const response = await apiClient.post("usuarios", user );
  console.log(response)
  return response.data;
};