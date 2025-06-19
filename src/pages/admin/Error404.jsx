import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-base-content mt-4">Halaman Tidak Ditemukan</h2>
          <p className="text-base-content/70 mt-2">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <Home className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}