import { useState, useEffect } from "react";
import { getCustomers, addCustomer, updateCustomer, inactivateCustomer } from "../services/customerService";
import { Customer } from "../models/Customer";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customer: Omit<Customer, "id_clientes">) => {
    try {
      const newCustomer = await addCustomer(customer);
      setCustomers((prev) => [...prev, newCustomer]);
    } catch (err: any) {
      setError(err.message || "Error al agregar el cliente");
    }
  };

  const handleUpdateCustomer = async (customer: Customer) => {
    try {
      const updatedCustomer = await updateCustomer(customer);
      setCustomers((prev) =>
        prev.map((c) => (c.id_clientes === updatedCustomer.id_clientes ? updatedCustomer : c))
      );
    } catch (err: any) {
      setError(err.message || "Error al actualizar el cliente");
    }
  };

  const handleInactivateCustomer = async (id: number) => {
    try {
      await inactivateCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id_clientes !== id));
    } catch (err: any) {
      setError(err.message || "Error al inactivar el cliente");
    }
  };

  return {
    customers,
    loading,
    error,
    handleAddCustomer,
    handleUpdateCustomer,
    handleInactivateCustomer,
  };
};
