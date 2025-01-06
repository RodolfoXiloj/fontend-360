import React from "react";
import { useCustomers } from "../hooks/useCustomers";
import { CustomerList } from "../components/CustomerList";
import { CustomerForm } from "../components/CreateCustomerForm";

const CustomerManagementPage: React.FC = () => {
  const { customers, loading, error, handleAddCustomer, handleUpdateCustomer, handleInactivateCustomer } =
    useCustomers();

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CustomerForm onSubmit={handleAddCustomer} />
      <CustomerList
        customers={customers}
        onEdit={handleUpdateCustomer}
        onInactivate={handleInactivateCustomer}
      />
    </div>
  );
};

export default CustomerManagementPage;
