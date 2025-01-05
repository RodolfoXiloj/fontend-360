import React from "react";
import { Container, Typography, Box } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
