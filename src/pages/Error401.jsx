import React from 'react';
import illustration from '../assets/error401.png';

export default function Error401() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-5xl w-full">

        <div className="md:w-1/2 w-full mb-6 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Error 401"
            className="w-64 md:w-72"
          />
        </div>

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-red-600 text-3xl font-bold mb-2">Oops 401</h1>
          <h2 className="text-gray-800 text-lg font-semibold mb-2">Tidak Terautentikasi</h2>
          <p className="text-gray-600 mb-4">
            Kamu belum login atau sesi kamu telah berakhir, sehingga tidak dapat mengakses halaman ini.
          </p>
          <p className="text-gray-500 mb-6">
            Silakan login kembali untuk melanjutkan akses.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}
