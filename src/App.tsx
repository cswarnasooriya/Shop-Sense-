/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductList } from './pages/admin/ProductList';
import { Cart } from './pages/Cart';
import { Categories } from './pages/Categories';
import { CategoryProducts } from './pages/CategoryProducts';
import { Profile } from './pages/Profile';
import { Unauthorized } from './pages/Unauthorized';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Guest Routes (Only accessible if NOT logged in) */}
            <Route element={<ProtectedRoute requireAuth={false} />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Public/Shared Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Routes wrapped in Global Layout (Navbar & Footer) */}
            <Route element={<Layout />}>
              {/* Protected Routes (Any logged-in user) */}
              <Route element={<ProtectedRoute requireAuth={true} />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:categoryName" element={<CategoryProducts />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin Routes (Only 'admin' role) */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductList />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
