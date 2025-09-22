import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const stored = localStorage.getItem('user');
  if (!stored) return <Navigate to="/login" replace />;

  const user = JSON.parse(stored);
  if (!user.is_superuser) return <Navigate to="/" replace />;

  return children;
}
