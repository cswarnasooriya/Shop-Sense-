import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton: React.FC = () => {
  return (
    <Link
      to="/home"
      className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-6 transition-colors duration-300 ease-in-out cursor-pointer active:scale-95"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Home
    </Link>
  );
};
