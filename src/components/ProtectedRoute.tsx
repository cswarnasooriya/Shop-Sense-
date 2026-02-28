import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, requireAuth = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If the route requires authentication and the user is NOT logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route is for guests only (e.g., /login) and the user IS logged in
  if (!requireAuth && user) {
    return <Navigate to="/home" replace />;
  }

  // If the route requires specific roles and the user doesn't have them
  if (requireAuth && allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

