import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Higher‑order component that protects routes from unauthenticated access.
 * If no JWT token is present in localStorage, the user is redirected to
 * the login page.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;