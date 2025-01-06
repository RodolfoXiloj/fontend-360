import apiClient from "../../../app/apiClient";
import { Product } from "../models/Product";

const BASE_URL = "productos";

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get(`${BASE_URL}/activo`);
  return response.data;
};

// Crear un producto
export const createProduct = async (product: Product): Promise<void> => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  await apiClient.post(BASE_URL, formData);
};

// Actualizar un producto
export const updateProduct = async (id: number, product: Product): Promise<void> => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  await apiClient.put(`${BASE_URL}/${id}`, formData);
};

// Inactivar un producto
export const inactivateProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`${BASE_URL}/${id}`);
};

export const fetchProductById = async (id: number) => {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
};
