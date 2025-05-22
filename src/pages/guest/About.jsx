export default function About() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Mengapa Memilih Sedap?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen untuk memberikan Anda pengalaman bersantap terbaik
            dengan pilihan restoran yang kurasi dan pengantaran cepat.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Pengantaran Cepat</h3>
            <p className="text-gray-600">
              Makanan Anda akan sampai dalam waktu kurang dari 30 menit atau
              gratis.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-3xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Pilihan Beragam</h3>
            <p className="text-gray-600">
              Pilih dari ratusan restoran dan ribuan menu makanan.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
            <p className="text-gray-600">
              Nikmati diskon eksklusif dan hadiah loyalitas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
