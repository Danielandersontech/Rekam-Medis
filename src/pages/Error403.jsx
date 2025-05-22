import React from 'react';
import illustration from '../assets/error403.png';

export default function Error403() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-5xl w-full">
        
        <div className="md:w-1/2 w-full mb-6 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Error 403"
            className="w-64 md:w-72"
          />
        </div>

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-red-600 text-3xl font-bold mb-2">Oops 403</h1>
          <h2 className="text-gray-800 text-lg font-semibold mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">
            Kamu tidak memiliki izin untuk mengakses halaman ini. Meskipun kamu mungkin sudah login, peran atau hak aksesmu tidak mencukupi.
          </p>
          <p className="text-gray-500 mb-6">
            Hubungi administrator jika kamu merasa ini adalah kesalahan, atau kembali ke halaman utama.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Kembali ke dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
