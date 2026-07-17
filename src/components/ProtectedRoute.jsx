// src/components/ProtectedRoute.jsx
// Replacement for the Base44 ProtectedRoute.
// Renders child routes when authenticated; otherwise renders the
// unauthenticatedElement (e.g. a redirect to /login).

import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ unauthenticatedElement = null }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return null; // or a spinner component

  return isAuthenticated ? <Outlet /> : unauthenticatedElement;
}
