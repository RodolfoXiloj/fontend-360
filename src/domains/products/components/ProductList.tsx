import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import { Grid, CircularProgress, Typography, Container } from "@mui/material";
import { Product } from "../models/Product";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id_productos}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No hay productos disponibles</Typography>
      )}
    </Container>
  );
};

export default ProductList;
