import { Link } from "react-router-dom";

export default function GuestHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/guest" className="text-3xl font-bold text-green-600">
            Sedap<span className="text-green-800">.</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/guest" className="text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/guest/about" className="text-gray-700 hover:text-green-600">About</Link>
          <Link to="/guest/products" className="text-gray-700 hover:text-green-600">Products</Link>
          <Link to="/guest/testimonials" className="text-gray-700 hover:text-green-600">Testimonials</Link>
          <Link to="/guest/stock-check" className="text-gray-700 hover:text-green-600">Cek Produk</Link>
        </nav>
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}