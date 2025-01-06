import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { fetchProductById } from "../services/productService"; // Servicio para obtener un producto por ID
import { CircularProgress, Container, Typography } from "@mui/material";
import ProductList from "../components/ProductList";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const [initialProduct, setInitialProduct] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await fetchProductById(Number(id));
          setInitialProduct(product);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleSuccess = () => {
    navigate("/products"); // Redirige a la lista de productos tras el éxito
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Producto" : "Crear Producto"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
            <ProductForm initialProduct={initialProduct} onSubmitSuccess={handleSuccess} />
            <ProductList />
        </>
      )}
    </Container>
  );
};

export default ProductPage;
