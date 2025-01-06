import apiClient from "../../../app/apiClient";
import { Customer } from "../models/Customer";

const BASE_URL = "clientes";
export const createCustomer = async (customer:Customer): Promise<{id_cliente: number}> => {
  const response = await apiClient.post("clientes",customer); // Cambiar al endpoint correcto
  return response.data; // Asegúrate de que `data` sea una lista de roles
};

export const addCustomer = async (customer:Omit<Customer, "id_clientes">): Promise<Customer> => {
  const response = await apiClient.post("clientes",customer); // Cambiar al endpoint correcto
  return response.data; // Asegúrate de que `data` sea una lista de roles
};


export const getCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get(BASE_URL);
  return response.data;
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient.put(`${BASE_URL}/${customer.id_clientes}`, customer);
  return response.data;
};

export const inactivateCustomer = async (id: number): Promise<void> => {
  await apiClient.patch(`${BASE_URL}/${id}/inactivate`);
};