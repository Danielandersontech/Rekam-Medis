import React from 'react';
import illustration from '../assets/error400.png';

export default function Error400() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-5xl w-full">

        <div className="md:w-1/2 w-full mb-6 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Error 400"
            className="w-64 md:w-72"
          />
        </div>

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-red-600 text-3xl font-bold mb-2">Oops 400</h1>
          <h2 className="text-gray-800 text-lg font-semibold mb-2">Bad Request</h2>
          <p className="text-gray-600 mb-4">
            Permintaan yang kamu kirim tidak dapat diproses oleh server karena ada format atau sintaks yang salah.
          </p>
          <p className="text-gray-500 mb-6">
            Hal ini bisa terjadi karena URL rusak, data yang dikirim tidak lengkap, atau format tidak sesuai.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
