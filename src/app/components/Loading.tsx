import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoadingProps {
  message?: string; // Mensaje opcional para mostrar
}

const Loading: React.FC<LoadingProps> = ({ message = "Cargando..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
