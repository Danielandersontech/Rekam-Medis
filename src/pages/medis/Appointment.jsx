import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Akila Tanjee", specialty: "Neurologist", available: true },
  { id: 2, name: "Dr. Babila Ebwele", specialty: "Radiologist", available: true },
  { id: 3, name: "Dr. Tange Meh", specialty: "Cardiologist", available: false },
];

const departments = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Pediatrics" },
  { id: 4, name: "Orthopedics" },
  { id: 5, name: "Radiology" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export default function Appointment() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" text-blue-900 py-16"
       style={{ backgroundImage: 'url("https://manicauniversity.com/images/pictures/School_of_Medicine.png")' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Buat Janji Temu
          </h1>
          <p className="text-xl text-blue-900">
            Jadwalkan kunjungan Anda dengan para profesional medis ahli kami
          </p>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Calendar className="mr-3" />
                  Jadwalkan Janji Temu Anda
                </h2>
                <p className="text-blue-100 mt-2">Isi formulir di bawah ini untuk membuat janji temu Anda</p>
              </div>
              
              <form className="p-8 space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Nama Lengkap *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kelamin *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Alamat email *
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Nomor Telepon *
                    </label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan Nomor Telepon Anda"
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Tanggal Pilihan *
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Waktu Pilihan*
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Waktu</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                     Departemen *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Departemen</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilihan Dokter 
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Pilih Dokter (Optional)</option>
                      {doctors.map((doctor) => (
                        <option 
                          key={doctor.id} 
                          value={doctor.name}
                          disabled={!doctor.available}
                        >
                          {doctor.name} - {doctor.specialty} {!doctor.available && "(Not Available)"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    Pesan Tambahan
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jelaskan gejala atau alasan kunjungan Anda (opsional)"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Saya menyetujui persyaratan <a href="#" className="text-blue-600 hover:underline">Syarat dan Ketentuan</a> dan <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
                >
                  Pesan Janji Temu
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Keadaan darurat?</h2>
            <p className="text-gray-700 mb-6">
              Jika Anda mengalami keadaan darurat medis, segera hubungi saluran darurat kami atau kunjungi ruang gawat darurat terdekat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:911" 
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Panggilan Darurat: 911
              </a>
              <a 
                href="tel:(237) 681-812-255" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Hospital Direct: (237) 681-812-255
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}