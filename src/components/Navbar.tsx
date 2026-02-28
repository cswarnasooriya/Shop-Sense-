import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, LogOut, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ease-out ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/60' : 'bg-white border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer transition-all duration-300 ease-out hover:opacity-80" onClick={() => navigate('/home')}>
            <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">Shop<span className="text-slate-900">Sense</span></span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 ease-out" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:text-sm transition-all duration-300 ease-out font-medium text-slate-900"
                placeholder="Search for fresh groceries, organic produce..."
              />
              <button className="absolute inset-y-1.5 right-1.5 px-5 bg-emerald-600 text-white rounded-lg text-sm font-bold cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-500 active:scale-95 shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/categories')}
              className="text-slate-600 font-bold cursor-pointer transition-all duration-300 ease-out hover:text-emerald-600 active:scale-95"
            >
              Categories
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-100 hover:shadow-sm active:scale-95 border border-emerald-200/50"
              >
                <ShieldCheck className="w-4 h-4" />
                Manage Products
              </button>
            )}
            {/* Cart */}
            <button onClick={() => navigate('/cart')} className="relative p-2 text-slate-600 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-600 active:scale-95 group">
              <div className="absolute inset-0 bg-emerald-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
              <ShoppingCart className="h-6 w-6 relative z-10" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full shadow-sm ring-2 ring-white transition-all duration-300 ease-out">
                {cartCount}
              </span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-600 focus:outline-none p-1 rounded-full hover:bg-slate-50 active:scale-95"
              >
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shadow-sm border border-emerald-200/50 transition-all duration-300 ease-out">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Welcome back</span>
                  <span className="text-sm font-bold text-slate-900 leading-tight">{user?.name || user?.email?.split('@')[0]}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-out ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 border border-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all duration-300 ease-out origin-top-right">
                  <div className="px-5 py-3 border-b border-slate-50 mb-2">
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{user?.email}</p>
                  </div>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => { setIsProfileOpen(false); navigate('/admin'); }}
                      className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-50 hover:text-emerald-700 font-semibold active:scale-95"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => { setIsProfileOpen(false); navigate('/profile'); }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-50 hover:text-emerald-700 font-semibold active:scale-95"
                  >
                    My Profile
                  </button>
                  {user?.role !== 'admin' && (
                    <button
                      onClick={() => { setIsProfileOpen(false); navigate('/cart'); }}
                      className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-50 hover:text-emerald-700 font-semibold active:scale-95"
                    >
                      My Orders
                    </button>
                  )}
                  <div className="border-t border-slate-50 my-2"></div>
                  <button
                    onClick={() => { setIsProfileOpen(false); handleLogout(); }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-red-600 cursor-pointer transition-all duration-300 ease-out hover:bg-red-50 flex items-center font-semibold active:scale-95"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => navigate('/cart')} className="relative p-2 text-slate-600 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-600 active:scale-95">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 cursor-pointer transition-all duration-300 ease-out hover:text-slate-900 hover:bg-slate-100 focus:outline-none p-2 bg-slate-50 rounded-xl active:scale-95"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-2 shadow-xl absolute w-full transition-all duration-300 ease-out">
          <div className="mb-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 ease-out" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-300 ease-out font-medium"
                placeholder="Search for groceries..."
              />
            </div>
          </div>
          <div className="flex items-center px-4 py-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mr-4 shadow-sm border border-emerald-200/50">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">{user?.name}</div>
              <div className="text-sm font-medium text-slate-500">{user?.email}</div>
            </div>
          </div>
          <div className="space-y-1">
            {user?.role === 'admin' && (
              <button onClick={() => { setIsMenuOpen(false); navigate('/admin'); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-700 hover:bg-emerald-50 active:scale-95">
                Admin Dashboard
              </button>
            )}
            <button onClick={() => { setIsMenuOpen(false); navigate('/profile'); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-700 hover:bg-emerald-50 active:scale-95">
              My Profile
            </button>
            <button onClick={() => { setIsMenuOpen(false); navigate('/cart'); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 cursor-pointer transition-all duration-300 ease-out hover:text-emerald-700 hover:bg-emerald-50 active:scale-95">
              My Orders
            </button>
            <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-red-600 cursor-pointer transition-all duration-300 ease-out hover:text-red-700 hover:bg-red-50 flex items-center mt-4 active:scale-95">
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
