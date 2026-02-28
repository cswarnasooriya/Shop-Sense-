import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-100 border-t-emerald-600 relative z-10"></div>
        </div>
        <p className="mt-6 text-emerald-800 font-medium animate-pulse">Verifying access...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
