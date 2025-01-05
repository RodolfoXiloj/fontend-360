import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../../app/AuthProvider";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      loginUser(user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        style={{ marginTop: "1rem" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;