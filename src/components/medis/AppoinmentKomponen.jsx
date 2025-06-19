export default function Appointment() {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bagian Kiri */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Buat Janji Temu
            </h2>
            <p className="text-base-content mb-6">
              Silakan isi formulir berikut untuk membuat janji temu dengan dokter kami. Kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
            </p>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face"
              alt="Dokter"
              className="rounded-xl shadow-lg w-full max-w-sm"
            />
          </div>

          {/* Bagian Formulir */}
          <div className="card bg-white shadow-xl p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Nama Lengkap</span>
                  </label>
                  <input type="text" placeholder="Masukkan nama Anda" className="input input-bordered w-full" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Jenis Kelamin</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>Pilih jenis kelamin</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="Masukkan email Anda" className="input input-bordered w-full" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">No. Telepon</span>
                  </label>
                  <input type="tel" placeholder="Contoh: 081234567890" className="input input-bordered w-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Tanggal Janji</span>
                  </label>
                  <input type="date" className="input input-bordered w-full" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Waktu Janji</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>09:00</option>
                    <option>13:00</option>
                    <option>16:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Dokter</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>Pilih Dokter</option>
                  <option>Dr. Akila Tanjee</option>
                  <option>Dr. Babila Ebwele</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Poli</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>Pilih Poli</option>
                  <option>Poli Jantung</option>
                  <option>Poli Saraf</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Pesan Tambahan</span>
                </label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Tuliskan keluhan atau informasi tambahan..."></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Kirim Permintaan Janji
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
