import illustration from '../assets/error404.png';

export default function Error404() {
  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center"
      style={{ overflow: 'hidden' }}
    >
      <div className="text-center max-w-sm px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Halaman tidak ditemukan</h1>
        <p className="text-sm text-blue-500 mb-4">
          Kamu tersesat. Tenang—kita bisa kembali ke tempat yang benar.
        </p>
        <img
          src={illustration}
          alt="Ilustrasi Error"
          className="w-48 h-auto mx-auto mb-7"
        />
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-950 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Kembali Ke Dashboard
        </button>
      </div>
    </div>
  );
}