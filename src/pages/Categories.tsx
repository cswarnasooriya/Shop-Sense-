import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUPERMARKET_CATEGORIES } from '../utils/categories';
import { BackButton } from '../components/BackButton';

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <BackButton />
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">All Categories</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Explore our wide range of fresh products, pantry staples, and household essentials.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SUPERMARKET_CATEGORIES.map((category) => {
          return (
            <div 
              key={category.name}
              onClick={() => navigate(`/category/${encodeURIComponent(category.name)}`)}
              className={`${category.color} rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 group relative overflow-hidden border border-slate-100/50`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out relative z-10 text-4xl`}>
                {category.icon}
              </div>
              <span className="font-bold text-slate-800 text-center text-lg relative z-10">{category.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};
