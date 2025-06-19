import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function MedicalFooter() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MEDD<span className="text-blue-300">I</span>CAL</h3>
            <p className="text-blue-200 mb-4">Leading the Way in Medical Excellence, trusted by patients worldwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition">Appointment</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">Doctors</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">Services</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition">About Us</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span className="text-blue-200">Call: (237) 681-812-255</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span className="text-blue-200">Email: filidule@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <span className="text-blue-200">Address: 0123 Some place</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-blue-200 mb-4">Subscribe to our newsletter for updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>© {new Date().getFullYear()} MEDDICAL. All rights reserved. Designed by PIXERLAB</p>
        </div>
      </div>
    </footer>
  );
}