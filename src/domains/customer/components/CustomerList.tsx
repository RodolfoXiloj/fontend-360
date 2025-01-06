import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Customer } from "../models/Customer";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onInactivate: (id: number) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onInactivate }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Razón Social</TableCell>
          <TableCell>Nombre Comercial</TableCell>
          <TableCell>Dirección</TableCell>
          <TableCell>Teléfono</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id_clientes}>
            <TableCell>{customer.razon_social}</TableCell>
            <TableCell>{customer.nombre_comercial}</TableCell>
            <TableCell>{customer.direccion_entrega}</TableCell>
            <TableCell>{customer.telefono}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(customer)}>Editar</Button>
              <Button onClick={() => onInactivate(customer.id_clientes!)} color="error">
                Inactivar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
