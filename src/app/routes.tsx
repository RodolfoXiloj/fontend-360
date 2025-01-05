import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../domains/auth/views/LoginPage";
import RegisterPage from "../domains/auth/views/RegisterPage";
import { useAuth } from "./AuthProvider";
import Loading from "./components/Loading";

const ProtectedRoute: React.FC<{ allowedRoles: number[]; children: React.ReactNode }> = ({
  allowedRoles,
  children,
}) => {
  const { user, isAuthenticated, isLoading  } = useAuth();
  if (isLoading) {
    return <Loading message="Esperando Autenticacion..." />; // Indicador de carga mientras se inicializa el estado
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.id_rol)) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={
          <ProtectedRoute allowedRoles={[1, 2, 3]}>
            <h1>Home</h1>
          </ProtectedRoute>
       }/>
       <Route path="/" element={
          <ProtectedRoute allowedRoles={[1, 2, 3]}>
            <h1>Home</h1>
          </ProtectedRoute>
       }/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[1, 2]}>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;