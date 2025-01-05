import apiClient from "../../../app/apiClient";
import { Role } from "../models/Role";

export const fetchRoles = async (role:number = 0): Promise<Role[]> => {
  const response = await apiClient.get(`/roles?role=${role}`); // Cambiar al endpoint correcto
  return response.data; // Asegúrate de que `data` sea una lista de roles
};
