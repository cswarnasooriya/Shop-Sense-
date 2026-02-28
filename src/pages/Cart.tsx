import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, CheckCircle2, User, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '../components/BackButton';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOrderSent, setIsOrderSent] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) {
      setShippingDetails({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const subtotal = cart.reduce((total, item) => {
    const price = item.discountPrice > 0 ? item.discountPrice : item.price;
    return total + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address) {
      setFormError('Please fill in all shipping details before checking out.');
      return;
    }
    setFormError('');

    setIsOrderSent(true);

    setTimeout(() => {
      let message = `*New Order from ShopSense*\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${shippingDetails.name}\n`;
      message += `Phone: ${shippingDetails.phone}\n`;
      message += `Address: ${shippingDetails.address}\n\n`;
      
      message += `*Order Details:*\n`;
      
      cart.forEach((item, index) => {
        const price = item.discountPrice > 0 ? item.discountPrice : item.price;
        message += `${index + 1}. ${item.title} - ${item.quantity}x ${formatPrice(price)}\n`;
      });

      message += `\n*Subtotal:* ${formatPrice(subtotal)}`;
      message += `\n*Delivery Fee:* ${deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}`;
      message += `\n*Total Amount:* ${formatPrice(total)}\n\n`;
      message += `Please confirm my order. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/94770000000?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      clearCart();
      navigate('/home');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-slate-300 shadow-sm border border-slate-100">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md font-medium">
          Looks like you haven't added anything to your cart yet. Discover our fresh products and start shopping!
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <BackButton />
      <AnimatePresence>
        {isOrderSent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center border border-slate-100">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500 border border-emerald-100">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Order Preparing!</h3>
              <p className="text-slate-500 font-medium">
                Your order is being sent. Thank you for shopping with ShopSense. Redirecting to WhatsApp...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items & Shipping Details */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => {
                const price = item.discountPrice > 0 ? item.discountPrice : item.price;
                return (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-slate-50/50 transition-colors duration-300 ease-out">
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-100 bg-white p-2">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{item.title}</h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{item.category}</p>
                        <div className="font-extrabold text-emerald-600">{formatPrice(price)}</div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full mt-4 sm:mt-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:shadow-sm text-slate-600 active:scale-95"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:shadow-sm text-slate-600 active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-900 hidden sm:block w-24 text-right">
                            {formatPrice(price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-400 cursor-pointer transition-all duration-300 ease-out hover:text-red-600 hover:bg-red-50 rounded-xl active:scale-95"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Shipping Details Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    required
                    value={shippingDetails.name}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out font-medium text-slate-900 placeholder-slate-400"
                    placeholder="+94 77 000 0000"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Delivery Address</label>
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 ease-out resize-none font-medium text-slate-900 placeholder-slate-400"
                    placeholder="123 Main Street, Colombo 01"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] xl:w-[450px]">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-28">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-slate-900 font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Delivery Fee</span>
                <span className="text-slate-900 font-bold">
                  {deliveryFee === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  Add {formatPrice(5000 - subtotal)} more to your cart to get free delivery!
                </div>
              )}
            </div>
            
            <div className="border-t border-slate-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right font-medium">Including all taxes</p>
            </div>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                {formError}
              </div>
            )}

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 px-4 bg-gradient-to-r from-[#25D366] to-[#1EBE5C] text-white font-bold rounded-xl cursor-pointer transition-all duration-300 ease-out hover:brightness-110 shadow-lg shadow-[#25D366]/30 active:scale-95 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Checkout via WhatsApp
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure checkout process
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
