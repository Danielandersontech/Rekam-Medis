import { useState } from "react";
import { BadgeCheck, Calendar, Clock, MapPin, Star } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Akila Tanjee, Sp.N",
    specialty: "Neurologi",
    department: "Saraf",
    experience: "12 tahun",
    rating: 4.9,
    schedule: {
      Senin: "08:00 - 12:00",
      Rabu: "13:00 - 17:00",
      Jumat: "09:00 - 14:00"
    },
    description: "Spesialis saraf dengan pengalaman lebih dari 10 tahun, ahli dalam menangani stroke, epilepsi, dan gangguan sistem saraf lainnya. Lulusan Fakultas Kedokteran Universitas Indonesia dan pernah menjalani fellowship di National Neurology Center, Singapura.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
    education: "Spesialis Neurologi (Universitas Indonesia), Fellowship Neurologi (Singapura)"
  },
  {
    id: 2,
    name: "Dr. Babila Ebwele, Sp.JP",
    specialty: "Kardiologi",
    department: "Jantung",
    experience: "15 tahun",
    rating: 4.8,
    schedule: {
      Selasa: "09:00 - 13:00",
      Kamis: "14:00 - 18:00",
      Sabtu: "10:00 - 14:00"
    },
    description: "Ahli jantung dan pembuluh darah dengan spesialisasi intervensi kardiologi. Berpengalaman dalam kateterisasi jantung dan pemasangan stent. Aktif sebagai pembicara dalam berbagai seminar jantung nasional dan internasional.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
    education: "Spesialis Jantung dan Pembuluh Darah (Universitas Gadjah Mada), Fellowship Intervensi Kardiologi (Malaysia)"
  },
  {
    id: 3,
    name: "Dr. Maya Indah, Sp.A",
    specialty: "Pediatri",
    department: "Anak",
    experience: "8 tahun",
    rating: 4.9,
    schedule: {
      Senin: "10:00 - 14:00",
      Rabu: "08:00 - 12:00",
      Jumat: "13:00 - 17:00"
    },
    description: "Dokter spesialis anak yang ramah dan berpengalaman dalam menangani berbagai masalah kesehatan anak dan tumbuh kembang. Memiliki pendekatan khusus dalam menangani anak dengan autisme dan gangguan perkembangan lainnya.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    education: "Spesialis Anak (Universitas Airlangga), Pelatihan Tumbuh Kembang Anak (RSCM)"
  },
  {
    id: 4,
    name: "Dr. Rudi Hermawan, Sp.OT",
    specialty: "Ortopedi",
    department: "Tulang",
    experience: "10 tahun",
    rating: 4.7,
    schedule: {
      Selasa: "08:00 - 14:00",
      Kamis: "09:00 - 15:00",
      Sabtu: "09:00 - 12:00"
    },
    description: "Ahli bedah ortopedi dengan keahlian dalam penggantian sendi dan penanganan trauma tulang. Berpengalaman dalam operasi arthroscopy dan rekonstruksi sendi. Aktif dalam penelitian tentang teknik bedah ortopedi minimal invasif.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
    education: "Spesialis Orthopedi (Universitas Padjadjaran), Pelatihan Arthroscopy (Korea Selatan)"
  },
  {
    id: 5,
    name: "Dr. Siti Rahayu, Sp.PD",
    specialty: "Penyakit Dalam",
    department: "Penyakit Dalam",
    experience: "14 tahun",
    rating: 4.8,
    schedule: {
      Senin: "09:00 - 15:00",
      Kamis: "08:00 - 12:00",
      Jumat: "13:00 - 17:00"
    },
    description: "Spesialis penyakit dalam dengan fokus pada penyakit metabolik dan endokrinologi. Berpengalaman dalam penanganan diabetes, hipertensi, dan gangguan metabolik lainnya. Pendekatan holistik dalam menangani pasien dengan penyakit kronis.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=300&fit=crop",
    education: "Spesialis Penyakit Dalam (Universitas Indonesia), Subspesialis Endokrinologi (RSCM)"
  },
  {
    id: 6,
    name: "Dr. Taufik Hidayat, Sp.KK",
    specialty: "Kulit dan Kelamin",
    department: "Dermatologi",
    experience: "7 tahun",
    rating: 4.7,
    schedule: {
      Selasa: "13:00 - 17:00",
      Rabu: "09:00 - 15:00",
      Sabtu: "09:00 - 13:00"
    },
    description: "Dokter spesialis kulit dan kelamin dengan keahlian dalam dermatologi estetika dan penanganan penyakit kulit kompleks. Berpengalaman dalam berbagai prosedur dermatologi seperti laser, filler, dan botox dengan pendekatan yang aman dan natural.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    education: "Spesialis Kulit dan Kelamin (Universitas Airlangga), Pelatihan Dermatologi Estetika (Thailand)"
  }
];

export default function DoctorsKomponen() {
  const [selectedDept, setSelectedDept] = useState("Semua");
  const [modalDoctor, setModalDoctor] = useState(null);

  const filteredDoctors =
    selectedDept === "Semua"
      ? doctors
      : doctors.filter((doc) => doc.department === selectedDept);

  const departments = ["Semua", ...new Set(doctors.map((doc) => doc.department))];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Tim Dokter Spesialis Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim dokter profesional kami siap memberikan pelayanan kesehatan terbaik dengan keahlian di berbagai bidang spesialisasi.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12 gap-3 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`btn ${selectedDept === dept ? "btn-primary" : "btn-outline btn-primary"}`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Dokter */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <figure className="px-6 pt-6 relative">
                <div className="avatar">
                  <div className="w-full rounded-xl h-64">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="badge badge-primary p-4 font-semibold">
                    {doctor.specialty}
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{doctor.name}</h2>
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{doctor.rating}</span>
                  <span className="text-gray-500 ml-2">({doctor.experience} pengalaman)</span>
                </div>
                <p className="text-gray-500 font-medium">{doctor.department}</p>
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Jadwal:
                    </span>
                    <span>{Object.keys(doctor.schedule).join(", ")}</span>
                  </div>
                </div>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setModalDoctor(doctor)}
                  >
                    Lihat Profil Lengkap
                  </button>
                  <button className="btn btn-outline btn-primary">
                    Buat Janji
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-semibold mb-2">Dokter tidak ditemukan</h3>
            <p className="text-gray-500">
              Maaf, saat ini tidak ada dokter yang tersedia untuk spesialisasi ini.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalDoctor && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src={modalDoctor.image}
                  alt={modalDoctor.name}
                  className="w-full rounded-lg shadow-md"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Spesialis {modalDoctor.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span>Rating {modalDoctor.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>Pengalaman {modalDoctor.experience}</span>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="font-bold text-2xl text-primary">{modalDoctor.name}</h3>
                <p className="text-lg font-semibold text-gray-600 mb-2">{modalDoctor.specialty}</p>
                <p className="text-gray-700 mb-4">{modalDoctor.description}</p>
                
                <div className="divider my-2"></div>
                
                <h4 className="font-bold text-lg mb-2">Pendidikan & Pelatihan:</h4>
                <p className="text-gray-700 mb-4">{modalDoctor.education}</p>
                
                <div className="divider my-2"></div>
                
                <h4 className="font-bold text-lg mb-2">Jadwal Praktek:</h4>
                <ul className="space-y-2">
                  {Object.entries(modalDoctor.schedule).map(([day, time]) => (
                    <li key={day} className="flex justify-between items-center p-2 bg-base-200 rounded-lg">
                      <span className="font-medium">{day}</span>
                      <span className="badge badge-primary badge-lg">{time}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="divider my-2"></div>
                
                <div className="flex justify-end gap-2">
                  <button className="btn btn-outline" onClick={() => setModalDoctor(null)}>
                    Tutup
                  </button>
                  <button className="btn btn-primary">
                    Buat Janji dengan Dokter Ini
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}