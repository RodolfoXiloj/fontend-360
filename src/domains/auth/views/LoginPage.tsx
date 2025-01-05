import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;