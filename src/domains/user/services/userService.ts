import apiClient from "../../../app/apiClient";
import { User } from "../models/User";

const BASE_URL = "usuarios";

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get(BASE_URL);
  return response.data;
};

export const deactivateUser = async (id: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/${id}`);
};

export const addUser= async (customer:Omit<User, "id_clientes">): Promise<User> => {
    const response = await apiClient.post("clientes",customer); 
    return response.data; 
}
  
export const updateUser= async (customer: User): Promise<User> => {
    const response = await apiClient.put(`${BASE_URL}/${customer.id_clientes}`, customer);
    return response.data;
};