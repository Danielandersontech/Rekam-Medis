import { useState } from "react";
import productsData from "../../assets/produk.json";

export default function StockCheck() {
  const [kodeProduk, setkodeProduk] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = (e) => {
    e.preventDefault();
    setError("");
    
    if (!kodeProduk) {
      setError("Kode produk tidak boleh kosong");
      return;
    }
    
    if (kodeProduk.length < 4) {
      setError("Kode produk harus minimal 4 karakter");
      return;
    }
    
    const product = productsData.find(
      (p) => p.kode_produk.toLowerCase() === kodeProduk.toLowerCase()
    );
    
    if (product) {
      setResult(product);
    } else {
      setResult({ notFound: true });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cek Ketersediaan Produk
        </h2>

        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Kode Produk</label>
            <input
              type="text"
              value={kodeProduk}
              onChange={(e) => setkodeProduk(e.target.value)}
              placeholder="Masukkan kode produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Cek Stok
          </button>
        </form>

        {result && (
          <div className="mt-6">
            {result.notFound ? (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">❌</span>
                  <p>Kode produk tidak ditemukan.</p>
                </div>
              </div>
            ) : result.stok > 0 ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <div>
                    <p className="font-semibold">
                      Produk {result.nama_produk} tersedia dengan harga Rp{result.harga.toLocaleString()}.
                    </p>
                    <p className="mt-1">Stok tersedia: {result.stok}</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span role="img" aria-label="shopping-cart" className="text-3xl">
                    🛒
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg relative">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <p className="font-semibold">
                    Produk {result.nama_produk} saat ini sedang habis.
                  </p>
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  OUT OF STOCK
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}