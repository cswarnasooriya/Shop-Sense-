import React, { useState, useEffect } from 'react';
import { ArrowRight, Truck, Clock, ShieldCheck, CreditCard, Leaf } from 'lucide-react';
import { subscribeToProducts, Product } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { SUPERMARKET_CATEGORIES } from '../utils/categories';
import { ProductCard } from '../components/ProductCard';

const TRUST_FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over LKR 5,000' },
  { icon: Leaf, title: '100% Organic', desc: 'Farm fresh produce' },
  { icon: Clock, title: '24/7 Support', desc: 'Always here to help' },
  { icon: CreditCard, title: 'Secure Payments', desc: '100% protected checkout' },
];

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToProducts((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Dynamic Hero Slider/Banner Area */}
        <section className="relative rounded-[2rem] overflow-hidden mb-12 shadow-2xl bg-gradient-to-r from-emerald-600 to-emerald-400">
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/seed/groceryhero/1200/500" 
              alt="Fresh Groceries" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative px-8 py-20 md:py-28 md:px-16 max-w-2xl z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest mb-6 border border-white/30 backdrop-blur-md uppercase shadow-sm">
              Fast & Reliable
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg tracking-tight">
              Fresh Groceries <br/>
              <span className="text-emerald-100">Delivered in Minutes</span>
            </h1>
            <p className="text-lg text-emerald-50 mb-10 max-w-lg leading-relaxed font-medium drop-shadow">
              Shop from thousands of fresh, local, and organic products. Experience the best quality delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/categories')}
                className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-50 active:scale-95 flex items-center justify-center gap-2 group shadow-xl"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </div>
        </section>

        {/* Trust Badges / Features Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRUST_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-100/50">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{feature.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Shop by Category Section */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shop by Category</h2>
              <p className="text-slate-500 mt-2 text-base font-medium">Find exactly what you need</p>
            </div>
            <Link to="/categories" className="text-emerald-600 font-bold cursor-pointer transition-all duration-300 ease-out hover:text-emerald-700 active:scale-95 hidden sm:flex items-center gap-1 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SUPERMARKET_CATEGORIES.slice(0, 4).map((category) => {
              return (
                <Link 
                  to={`/category/${encodeURIComponent(category.name)}`}
                  key={category.name}
                  className={`${category.color} rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 group relative overflow-hidden border border-slate-100/50`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out relative z-10 text-3xl`}>
                    {category.icon}
                  </div>
                  <span className="font-bold text-slate-800 text-center text-base relative z-10">{category.name}</span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Promotional "Bank Offers" / Mid-Page Banner */}
        <section className="mb-16 rounded-[2rem] overflow-hidden relative bg-indigo-50 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-sm border border-indigo-100">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-3 block bg-indigo-100 w-max px-3 py-1 rounded-full">Weekend Special</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">Get 20% off with selected credit cards on weekends!</h2>
            <p className="text-slate-600 mb-8 text-base font-medium">Stock up your pantry and save big. Valid for all major credit cards.</p>
            <button 
              onClick={() => navigate('/categories')}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold cursor-pointer transition-all duration-300 ease-out hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              Shop the Sale
            </button>
          </div>
          <div className="md:w-1/2 flex justify-end relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl opacity-50 transform -translate-x-4 translate-y-4"></div>
              <img src="https://picsum.photos/seed/creditcard/400/300" alt="Bank Offers" className="rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 ease-out relative z-10" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>

        {/* Trending / Best Sellers Grid */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trending Products</h2>
              <p className="text-slate-500 mt-2 text-base font-medium">Handpicked fresh arrivals for you</p>
            </div>
            <Link to="/categories" className="text-emerald-600 font-bold cursor-pointer transition-all duration-300 ease-out hover:text-emerald-700 active:scale-95 hidden sm:flex items-center gap-1 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </Link>
          </div>

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
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-white rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden shadow-sm border border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Subscribe to our Newsletter</h2>
            <p className="text-slate-500 mb-10 text-base font-medium">Get the latest updates on daily offers, fresh arrivals, and exclusive discounts delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 ease-out font-medium"
                required
              />
              <button type="submit" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-900/20">
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
    </div>
  );
};
