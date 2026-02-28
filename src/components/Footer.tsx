import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-emerald-600 tracking-tight">ShopSense</span>
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Your premium destination for fresh, organic, and locally sourced groceries delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Shop Categories</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Weekly Specials</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Our Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6 text-lg">Customer Service</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>123 Fresh Market Blvd,<br />Suite 100, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>support@shopsense.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopSense. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
