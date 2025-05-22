import illustration from '../assets/error404.png';

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Oops 404!</h1>
      <p className="text-lg text-gray-700 mb-2">Halaman tidak ditemukan</p>
      <p className="text-gray-500 mb-6">
        Sepertinya kamu tersesat. Tapi tidak apa-apa, kita bisa kembali ke tempat yang benar.
      </p>

      <img
        src={illustration}
        alt="404 Illustration"
        className="w-100 mx-auto mb-6"
      />

      <button
        onClick={() => window.location.href = '/'}
        className="text-white bg-black px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Kembali Ke Dashboard
      </button>
    </div>
  );
}