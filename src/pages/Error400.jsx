import React from 'react';
import illustration from '../assets/error400.png';
import { RefreshCw, Home } from 'lucide-react';

export default function Error400() {
  const handleRefresh = () => {
    window.location.reload(); 
  };

  const handleGoHome = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-red-100 to-orange-100 font-sans">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-2xl p-8 md:p-16 max-w-4xl w-full transform transition-all duration-300 hover:scale-[1.01] animate-fadeInUp">

        {/* Bagian Ilustrasi/Gambar */}
        <div className="md:w-1/2 w-full mb-8 md:mb-0 flex justify-center order-1 md:order-1">
          <img
            src={illustration}
            alt="Error 400: Ilustrasi Permintaan Buruk"
            className="w-72 md:w-80 h-auto drop-shadow-xl animate-float"
          />
        </div>

        {/* Bagian Konten Teks */}
        <div className="md:w-1/2 w-full text-center md:text-left order-2 md:order-2">
          <h1 className="text-red-700 text-5xl sm:text-6xl font-extrabold mb-3 tracking-tight">
            Oops! 400
          </h1>
          <h2 className="text-gray-800 text-2xl font-bold mb-4">
            Permintaan Buruk (Bad Request)
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed text-base md:text-lg">
            Maaf, server tidak dapat memahami permintaan Anda. Ini sering terjadi karena format data yang tidak valid atau URL yang rusak.
          </p>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Coba periksa kembali URL atau informasi yang Anda kirim. Jika masalah berlanjut, mungkin ada kesalahan pada aplikasi yang perlu diperbaiki.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-base"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </button>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold px-7 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200 text-base"
            >
              <RefreshCw className="w-4 h-4" />
              Coba Lagi
            </button>
          </div>
        </div>
      </div>

      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}