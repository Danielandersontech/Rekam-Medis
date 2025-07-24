import React from 'react';
import illustration from '../assets/403.png'; // Pastikan path ini benar!
import { Home, Mail } from 'lucide-react'; // Ikon opsional untuk tombol

export default function Error403() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl w-full transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-up">

        {/* Gambar */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Error 403 - Akses Dilarang"
            className="w-64 md:w-80 drop-shadow-2xl animate-float" // Animasi float opsional
          />
        </div>

        {/* Teks */}
        <div className="md:w-1/2 w-full text-center md:text-left md:pl-10">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">Oops, Ada Masalah!</p>
          <h1 className="text-gray-900 text-5xl font-extrabold mb-3 leading-tight">403 Forbidden</h1>
          <h2 className="text-gray-700 text-2xl font-semibold mb-5">Akses Ditolak Dengan Tegas!</h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            Maaf, kamu tidak memiliki izin untuk melihat halaman ini. Meskipun kamu mungkin sudah masuk, hak akses atau peran akunmu tidak mencukupi.
          </p>
          <p className="text-gray-500 text-base mb-8">
            Jika kamu yakin ini adalah kesalahan, silakan hubungi administrator sistem untuk mendapatkan bantuan lebih lanjut.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-all duration-400 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              <Home size={22} /> Kembali ke Beranda
            </button>
            {/* Tombol opsional untuk menghubungi admin */}
            <button
              onClick={() => window.location.href = 'mailto:admin@example.com'} // Ganti dengan email admin yang sebenarnya
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-8 py-3.5 rounded-full text-lg font-medium transition-all duration-300 ease-in-out hover:bg-gray-300 hover:shadow transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <Mail size={22} /> Hubungi Admin
            </button>
          </div>
        </div>
      </div>

      {/* Animasi Tambahan (sama dengan 401) */}
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