// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn || userRole !== "admin") {
    // Not logged in or not admin → redirect to login
    return <Navigate to="/login" replace />;
  }

  // If admin, show the protected page
  return children;
};

export default AdminRoute;
