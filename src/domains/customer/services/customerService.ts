import apiClient from "../../../app/apiClient";
import { Customer } from "../models/Customer";

export const createCustomer = async (customer:Customer): Promise<{id_cliente: number}> => {
  const response = await apiClient.post("clientes",customer); // Cambiar al endpoint correcto
  return response.data; // Asegúrate de que `data` sea una lista de roles
};
