import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function MedicalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-blue-800">
          <div className="flex space-x-6">
            <span>📞 DARURAT: (0761) 123-456</span>
            <span>⏰ JAM KERJA: 09:00 - 20:00 Setiap Hari</span>
          </div>
          <div className="flex space-x-4">
            <span>📍 LOKASI: Pekanbaru, Riau</span>
          </div>
        </div>


        {/* Main navigation */}
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              MEDD<span className="text-blue-300">I</span>CAL
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="hover:text-blue-300 font-medium transition">Beranda</Link>
            <Link to="/medis/tentang" className="hover:text-blue-300 font-medium transition">Tentang Kami</Link>
            <Link to="/medis/services" className="hover:text-blue-300 font-medium transition">Layanan</Link>
            <Link to="/medis/appoinment" className="hover:text-blue-300 font-medium transition">Dokter</Link>
            <Link to="/medis/news" className="hover:text-blue-300 font-medium transition">Berita</Link>
            <Link to="/medis/contact" className="hover:text-blue-300 font-medium transition">Kontak</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-800 rounded-full transition">
              <Search size={20} />
            </button>
            <Link to="/login" className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              <User size={18} />
              <span>Login</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-blue-800 rounded-full transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-blue-800">
            <div className="flex flex-col space-y-4">
              <Link to="/medis" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/medis/tentang" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/medis/services" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/medis/doctors" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
              <Link to="/medis/news" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>News</Link>
              <Link to="/contact" className="hover:text-blue-300 font-medium transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/medis/contact" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition w-fit" onClick={() => setIsMenuOpen(false)}>
                <User size={18} />
                <span>Login</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}