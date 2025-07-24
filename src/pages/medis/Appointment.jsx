import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Akila Tanjee", specialty: "Neurologi", available: true, image: "https://www.quipper.com/id/blog/wp-content/uploads/2021/12/Template-Image-Blog-white-12-3-2021-gaji-dokter.webp" },
  { id: 2, name: "Dr. Babila Ebwele", specialty: "Radiologi", available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Dr. Tange Meh", specialty: "Kardiologi", available: false, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const departments = [
  { id: 1, name: "Kardiologi" },
  { id: 2, name: "Neurologi" },
  { id: 3, name: "Pediatri" },
  { id: 4, name: "Ortopedi" },
  { id: 5, name: "Radiologi" },
  { id: 6, name: "Penyakit Dalam" },
  { id: 7, name: "Oftalmologi" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function Appointment() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        // --- LINK GAMBAR BARU DI SINI ---
        style={{ backgroundImage: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAUfMRLOvP9Cv29sGev1UWV9t3Xvtf46B9pLwnLILzkv_e_Szor7WfvhiNwqABAXMoDKMtmVL42-BCtAZm-QRR1ogdvYV16PKI4O0f-Fla_7Pv0BKffPSGOCmGRrUr68yVSoljxnYcOvSVHqmasLYdXLWLvo9Snda-ZNWKdtvM52wwf5N3dbFLPmTf62sT/s612/v,po%5Bd,%5Bpb.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/60"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Buat Janji Temu
          </h1>
          <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto opacity-90">
            Jadwalkan kunjungan Anda dengan para profesional medis ahli kami
            untuk perawatan terbaik.
          </p>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-500">
              <div className="bg-blue-700 text-white p-8">
                <h2 className="text-3xl font-bold flex items-center mb-2">
                  <Calendar className="mr-4 w-8 h-8" />
                  Jadwalkan Janji Temu Anda
                </h2>
                <p className="text-blue-100 text-lg">
                  Isi formulir di bawah ini untuk membuat janji temu Anda.
                </p>
              </div>

              <form className="p-10 space-y-8">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      <User className="inline w-5 h-5 mr-2 text-blue-600" />
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Jenis Kelamin *
                    </label>
                    <select
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      <Mail className="inline w-5 h-5 mr-2 text-blue-600" />
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      <Phone className="inline w-5 h-5 mr-2 text-blue-600" />
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                      placeholder="Masukkan Nomor Telepon Anda"
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      <Calendar className="inline w-5 h-5 mr-2 text-blue-600" />
                      Tanggal Pilihan *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      <Clock className="inline w-5 h-5 mr-2 text-blue-600" />
                      Waktu Pilihan *
                    </label>
                    <select
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                    >
                      <option value="">Pilih Waktu</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Departemen *
                    </label>
                    <select
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                    >
                      <option value="">Pilih Departemen</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Pilihan Dokter
                    </label>
                    <select className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base">
                      <option value="">Pilih Dokter (Opsional)</option>
                      {doctors.map((doctor) => (
                        <option
                          key={doctor.id}
                          value={doctor.name}
                          disabled={!doctor.available}
                          className={!doctor.available ? "text-gray-400" : ""}
                        >
                          {doctor.name} - {doctor.specialty} {!doctor.available && "(Tidak Tersedia)"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline w-5 h-5 mr-2 text-blue-600" />
                    Pesan Tambahan
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                    placeholder="Jelaskan gejala atau alasan kunjungan Anda (opsional)"
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-base text-gray-700">
                    Saya menyetujui <a href="#" className="text-blue-600 hover:underline font-medium">Syarat dan Ketentuan</a> dan <a href="#" className="text-blue-600 hover:underline font-medium">Kebijakan Privasi</a> kami.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  Pesan Janji Temu
                </button>
              </form>
            </div>

            {/* Doctor/Department Info Column */}
            <div className="lg:col-span-1 space-y-10">
              {/* Info Dokter */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                  Dokter Kami
                </h3>
                <ul className="space-y-6">
                  {doctors.map((doctor) => (
                    <li key={doctor.id} className="flex items-center space-x-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                      />
                      <div>
                        <p className="font-semibold text-xl text-gray-900">{doctor.name}</p>
                        <p className={`text-base ${doctor.available ? "text-green-600" : "text-red-600"}`}>
                          {doctor.specialty}
                          <span className="ml-2 font-medium">
                            ({doctor.available ? "Tersedia" : "Tidak Tersedia"})
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Departemen */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                  Departemen Kami
                </h3>
                <ul className="space-y-4">
                  {departments.map((dept) => (
                    <li key={dept.id} className="flex items-center space-x-3 text-lg text-gray-700">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{dept.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
              Dalam Keadaan Darurat Medis?
            </h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed">
              Jika Anda mengalami keadaan darurat medis, segera hubungi saluran darurat kami atau kunjungi ruang gawat darurat terdekat.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:911"
                className="flex items-center justify-center space-x-3 bg-white text-red-600 px-10 py-4 rounded-full
                           hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                <span>Hubungi 911 (Darurat)</span>
              </a>
              <a
                href="tel:+628123456789"
                className="flex items-center justify-center space-x-3 border-2 border-white text-white px-10 py-4 rounded-full
                           hover:bg-white hover:text-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                <span>Telepon Langsung Rumah Sakit</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}