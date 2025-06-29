// AuthModal.jsx
import React, { useState } from "react";
import Login from "..components/LoginPage.jsx";
import Register from "../components/RegistrationPage.jsx";

const AuthModal = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  return showLogin ? (
    <Login onClose={onClose} onSwitchToRegister={() => setShowLogin(false)} />
  ) : (
    <Register onClose={onClose} onSwitchToLogin={() => setShowLogin(true)} />
  );
};

export default AuthModal;
