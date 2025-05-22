import { Link } from "react-router-dom";
import products from "../../assets/produk.json";

export default function Products() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Menu Favorit Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berikut beberapa menu favorit pelanggan kami. Coba sekarang juga!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.kode_produk}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.gambar}
                alt={product.nama_produk}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.nama_produk}</h3>
                <p className="text-green-600 font-bold">
                  Rp{product.harga.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/guest/products"
            className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </div>
    </section>
  );
}
