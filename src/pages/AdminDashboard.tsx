import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage products, orders, and users</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">{user?.name} (Admin)</span>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-emerald-600 font-medium hover:underline"
          >
            Storefront
          </button>
          <button
            onClick={() => logout()}
            className="text-sm text-red-600 font-medium hover:underline"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Admin Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
            <p className="text-gray-500 text-sm mb-4">Manage inventory and categories</p>
            <button className="text-emerald-600 text-sm font-medium hover:underline">View Products &rarr;</button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Orders</h3>
            <p className="text-gray-500 text-sm mb-4">View and process customer orders</p>
            <button className="text-emerald-600 text-sm font-medium hover:underline">View Orders &rarr;</button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Users</h3>
            <p className="text-gray-500 text-sm mb-4">Manage customer accounts and roles</p>
            <button className="text-emerald-600 text-sm font-medium hover:underline">View Users &rarr;</button>
          </div>
        </div>
      </main>
    </div>
  );
};
