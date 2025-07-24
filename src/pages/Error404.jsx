import illustration from '../assets/error404.png';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fadeIn">
        <img
          src={illustration}
          alt="Ilustrasi Error"
          className="w-56 h-auto mx-auto mb-6 drop-shadow-md"
        />
        <h1 className="text-5xl font-bold text-blue-900 mb-3">Oops!</h1>
        <p className="text-lg text-blue-600 font-medium mb-1">404 - Halaman tidak ditemukan</p>
        <p className="text-sm text-blue-500 mb-6">
          Sepertinya kamu tersesat. Ayo kembali ke tempat yang benar.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-2 rounded-full shadow transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
