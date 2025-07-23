export default function GuestFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">Sedap<span className="text-white">.</span></h3>
            <p className="text-gray-400">Delicious food delivered to your doorstep.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@sedap.com</p>
            <p className="text-gray-400">Phone: +62 123 4567 890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Partners</h4>
            <div className="flex space-x-4">
              <img src="https://avatar.iran.liara.run/public/25" alt="Partner 1" className="h-10" />
              <img src="https://avatar.iran.liara.run/public/10" alt="Partner 2" className="h-10" />
              <img src="https://avatar.iran.liara.run/public/1" alt="Partner 3" className="h-10" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Sedap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
