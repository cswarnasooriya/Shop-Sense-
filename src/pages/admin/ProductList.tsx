import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Package, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToProducts, addProduct, updateProduct, deleteProduct, Product, ProductData } from '../../services/productService';
import { SUPERMARKET_CATEGORIES } from '../../utils/categories';
import { BackButton } from '../../components/BackButton';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    imageUrl: '',
    stock: '',
    ratingAvg: '0',
    ratingCount: '0'
  });

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToProducts((fetchedProducts) => {
      setProducts(fetchedProducts);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        discountPrice: product.discountPrice.toString(),
        category: product.category,
        imageUrl: product.imageUrl,
        stock: product.stock.toString(),
        ratingAvg: product.ratingAvg?.toString() || '0',
        ratingCount: product.ratingCount?.toString() || '0',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        discountPrice: '',
        category: '',
        imageUrl: '',
        stock: '',
        ratingAvg: '0',
        ratingCount: '0'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingProduct(null), 300); // Wait for animation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);

      const productData: ProductData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        discountPrice: parseFloat(formData.discountPrice) || 0,
        category: formData.category,
        imageUrl: formData.imageUrl,
        stock: parseInt(formData.stock, 10) || 0,
        ratingAvg: parseFloat(formData.ratingAvg) || 0,
        ratingCount: parseInt(formData.ratingCount, 10) || 0,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }

      handleCloseModal();
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    
    try {
      setError(null);
      await deleteProduct(id);
    } catch (err: any) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <BackButton />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manage Products</h1>
          <p className="text-slate-500 mt-2 font-medium">Add, edit, or remove products from your store.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-500 active:scale-95 flex items-center gap-2 shadow-lg shadow-emerald-600/20"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-emerald-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-16 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">Your store is currently empty. Start by adding your first product.</p>
          <button
            onClick={() => handleOpenModal()}
            className="px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-500 active:scale-95 inline-flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-5 h-5" />
            Add First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors duration-300 ease-out group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden bg-white flex-shrink-0 p-1">
                          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{product.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-1 w-48 font-medium">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        {product.discountPrice > 0 ? (
                          <>
                            <span className="font-bold text-emerald-600">{formatPrice(product.discountPrice)}</span>
                            <span className="text-xs text-slate-400 line-through">{formatPrice(product.price)}</span>
                          </>
                        ) : (
                          <span className="font-bold text-slate-900">{formatPrice(product.price)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${product.stock > 10 ? 'text-slate-900' : product.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-700">{product.ratingAvg || 0}</span>
                        <span className="text-xs text-slate-400 font-medium">({product.ratingCount || 0})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 ease-out active:scale-95"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 ease-out active:scale-95"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100"
            >
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors duration-300 ease-out active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="e.g., Organic Bananas"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out resize-none font-medium text-slate-900 placeholder-slate-400"
                        placeholder="Product description..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Regular Price (LKR)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Discount Price (LKR) <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Category</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 appearance-none"
                      >
                        <option value="" disabled>Select a category</option>
                        {SUPERMARKET_CATEGORIES.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="1"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Rating Average</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.ratingAvg}
                        onChange={(e) => setFormData({ ...formData, ratingAvg: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Review Count</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.ratingCount}
                        onChange={(e) => setFormData({ ...formData, ratingCount: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="0"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Image URL</label>
                      <input
                        type="url"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.imageUrl && (
                        <div className="mt-4 w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-white p-1">
                          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors duration-300 ease-out active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="product-form"
                  disabled={isSaving}
                  className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Product'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
