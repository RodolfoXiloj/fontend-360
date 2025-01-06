import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={typeof product.foto === "string" ? product.foto : URL.createObjectURL(product.foto as File)}
        alt={product.nombre}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.nombre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Marca: {product.marca || "Sin marca"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stock: {product.stock}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Precio: ${product.precio}
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/products/edit/${product.id_productos}`)}
        >
          Editar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
