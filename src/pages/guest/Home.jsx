import { Link } from "react-router-dom";
import About from "./About";
import Testimonials from "./testimonials";
import Products from "./Products";

export default function GuestHome() {
  return (
    <div>
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Makanan Lezat <span className="text-green-600">Diantar</span> ke
              Pintu Rumah Anda
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Pesan makanan favorit Anda dari restoran terbaik di kota dan
              nikmati pengalaman pengantaran yang mudah dan cepat.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mulai Sekarang
              </Link>
              <Link
                to="/guest/products"
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
              >
                Lihat Menu
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Makanan Lezat"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <About />
      <Products/>
      <Testimonials/>
    </div>
  );
}
