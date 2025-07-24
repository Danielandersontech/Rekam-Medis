import React from 'react';
import illustration from '../assets/401.png'; // Pastikan path ini benar
import { LogIn } from 'lucide-react'; // Ikon opsional

export default function Error401() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-xl rounded-3xl p-8 md:p-12 max-w-4xl w-full transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-up">

        {/* Gambar */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Error 401 - Akses Tidak Sah"
            className="w-64 md:w-80 drop-shadow-2xl animate-float" // Animasi float opsional
          />
        </div>

        {/* Teks */}
        <div className="md:w-1/2 w-full text-center md:text-left md:pl-10">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2">Oops!</p>
          <h1 className="text-gray-900 text-5xl font-extrabold mb-3 leading-tight">401 Unauthorized</h1>
          <h2 className="text-gray-700 text-2xl font-semibold mb-5">Akses Ditolak</h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            Sepertinya kamu belum masuk atau sesi kamu sudah tidak aktif.
          </p>
          <p className="text-gray-500 text-base mb-8">
            Silakan klik tombol di bawah untuk kembali login dan melanjutkan petualanganmu!
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-7 py-3 rounded-full text-lg font-medium transition-all duration-400 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <LogIn size={20} /> Login Sekarang
          </button>
        </div>
      </div>

      {/* Animasi Tambahan */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}