import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToProductsByCategory, Product } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Package } from 'lucide-react';
import { SUPERMARKET_CATEGORIES } from '../utils/categories';
import { BackButton } from '../components/BackButton';
import { ProductCard } from '../components/ProductCard';

export const CategoryProducts: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categoryDetails = SUPERMARKET_CATEGORIES.find(c => c.name === categoryName);

  useEffect(() => {
    if (!categoryName) return;
    setIsLoading(true);
    const unsubscribe = subscribeToProductsByCategory(categoryName, (fetchedProducts) => {
      setProducts(fetchedProducts);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <BackButton />

      <div className="flex items-center gap-5 mb-12 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        {categoryDetails && (
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${categoryDetails.color}`}>
            {categoryDetails.icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{categoryName}</h1>
          <p className="text-base text-slate-500 mt-1 font-medium">{products.length} products available</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-emerald-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">No products found</h2>
          <p className="text-slate-500 text-center max-w-md font-medium">We currently don't have any products in the {categoryName} category. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
              showAddButton={user?.role !== 'admin'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
