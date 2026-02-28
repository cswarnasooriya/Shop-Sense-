import React from 'react';
import { Star, Plus, Search } from 'lucide-react';
import { Product } from '../services/productService';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  showAddButton: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, showAddButton }) => {
  const formatPrice = (price: number) => `LKR ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const rating = product.ratingAvg || 0;
  const reviews = product.ratingCount || 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 group flex flex-col relative">
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
        {product.discountPrice > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm backdrop-blur-md">
            Sale
          </div>
        )}
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/90 backdrop-blur-sm text-slate-900 rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-slate-400 mb-1.5 font-semibold tracking-wider uppercase">{product.category}</div>
        <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-emerald-600 transition-colors duration-300 leading-snug">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-slate-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400 font-medium">({reviews})</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            {product.discountPrice > 0 ? (
              <>
                <span className="text-lg font-extrabold text-emerald-600">{formatPrice(product.discountPrice)}</span>
                <span className="text-xs text-slate-400 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-slate-800">{formatPrice(product.price)}</span>
            )}
          </div>
          {showAddButton && (
            <button 
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-emerald-600 shadow-md active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
