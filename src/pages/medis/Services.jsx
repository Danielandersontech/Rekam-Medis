import { Heart, Brain, Baby, Bone, Eye, Stethoscope, Activity, Shield, Clock, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Heart,
    title: "Kardiologi",
    description: "Perawatan jantung yang komprehensif, mencakup diagnosis, pengobatan, dan pencegahan penyakit kardiovaskular. Layanan ini ditangani oleh dokter spesialis jantung berpengalaman.",
    features: ["Tes ECG & Uji Stres Jantung", "Kateterisasi Jantung", "Operasi Jantung", "Perawatan Pencegahan untuk Kesehatan Jantung"],
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Brain,
    title: "Neurologi",
    description: "Perawatan khusus untuk gangguan pada sistem saraf, otak, dan sumsum tulang belakang. Dilengkapi teknologi pencitraan mutakhir dan penanganan komprehensif.",
    features: ["Pencitraan Otak", "Penanganan Stroke", "Perawatan Epilepsi", "Gangguan Memori & Kognitif"],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Baby,
    title: "Pediatri",
    description: "Pelayanan kesehatan khusus untuk bayi, anak-anak, dan remaja sejak lahir hingga usia 18 tahun. Fokus pada pertumbuhan dan perkembangan anak yang optimal.",
    features: ["Pemeriksaan Rutin Anak Sehat", "Vaksinasi Anak", "Pemantauan Pertumbuhan", "Perawatan Perkembangan Anak"],
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Bone,
    title: "Ortoped",
    description: "Pengobatan dan pemulihan cedera sistem muskuloskeletal serta gangguan pada tulang dan sendi. Dilengkapi terapi fisik dan tindakan medis lanjutan.",
    features: ["Penggantian Sendi", "Pengobatan Cedera Olahraga", "Penanganan Patah Tulang", "Terapi Fisik"],
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Eye,
    title: "Oftalmologi",
    description: "Layanan perawatan mata lengkap, termasuk koreksi penglihatan dan prosedur bedah mata modern oleh dokter spesialis mata",
    features: ["Operasi Katarak", "LASIK (Bedah Refraktif)", "Pengobatan Glaukoma", "Perawatan Retina"],
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Stethoscope,
    title: "Peanykit Dalam",
    description: "Perawatan primer untuk orang dewasa, fokus pada pencegahan, diagnosis, dan pengobatan berbagai penyakit kronis.",
    features: ["Pemeriksaan Tahunan", "Manajemen Penyakit Kronis", "Perawatan Pencegahan", "Skrining Kesehatan"],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Activity,
    title: "Kedokteran Gawat Darurat",
    description: "Layanan darurat 24 jam untuk kondisi medis kritis dan situasi yang mengancam jiwa. Dilengkapi tim respons cepat dan fasilitas lengkap.",
    features: ["Penanganan Trauma", "Perawatan Intensif", "Operasi Darurat", "Layanan Ambulans"],
    color: "bg-red-100 text-red-700"
  },
  {
    icon: Shield,
    title: "Perawatan Pencegahan",
    description: "Pelayanan kesehatan preventif yang menyeluruh untuk membantu menjaga kesehatan dan mencegah penyakit sejak dini.",
    features: ["Pemeriksaan Kesehatan", "Vaksinasi", "Program Kesehatan & Kebugaran", "Konseling Gaya Hidup Sehat"],
    color: "bg-indigo-100 text-indigo-600"
  }
];

const emergencyServices = [
  "Unit Gawat Darurat 24/7",
  "Bedah Trauma Darurat",
  "Unit Perawatan Intensif (ICU)",
  "Layanan Ambulans Siaga",
  "Penanganan Serangan Jantung Darurat",
  "Tim Respon Cepat Stroke"
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Layanan Medis Kami
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
Pelayanan kesehatan menyeluruh yang diberikan oleh tenaga medis ahli dengan dukungan teknologi terkini untuk hasil perawatan terbaik.          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perawatan Medis Lengkap
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
Kami menyediakan berbagai layanan dan spesialisasi medis yang lengkap untuk memenuhi seluruh kebutuhan kesehatan Anda — dari pencegahan hingga pengobatan tingkat lanjut.            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
Layanan Gawat Darurat              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Departemen gawat darurat kami siap melayani 24 jam sehari, 7 hari seminggu. Didukung oleh tim dokter spesialis dan tenaga medis berpengalaman, kami siap menangani segala jenis keadaan darurat medis dengan cepat, tepat, dan profesional.

Kami menyediakan respons cepat dan perawatan darurat menyeluruh untuk memastikan pasien mendapatkan penanganan terbaik di saat-saat kritis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {emergencyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:911" 
                  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  <Phone size={18} />
                  <span>Hubungi Darurat 119</span>
                </a>
                <a 
                  href="tel:(237) 681-812-255" 
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Phone size={18} />
                  <span>Hubungi Rumah Sakit Langsung</span>
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop"
                alt="Emergency Department"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">RSiap Menjadwalkan Janji Temu Anda?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
Tim medis kami siap memberikan perawatan terbaik dengan standar kualitas tertinggi. Jadwalkan kunjungan Anda hari ini dan mulai langkah menuju kesehatan yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <Calendar size={18} />
              <span>Jadwalkan Janji Temu</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition font-medium"
            >
              <Phone size={18} />
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="mr-3 text-blue-600" />
Jam Operasional              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Senin – Jumat</span>
                  <span className="text-gray-600">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Sabtu</span>
                  <span className="text-gray-600">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Minggu</span>
                  <span className="text-gray-600">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-red-600">Layanan Gawat Darurat</span>
                  <span className="text-red-600 font-medium">Tersedia 24 Jam / 7 Jam</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Kenapa Memilih MEDDICAL?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Tim medis berpengalaman dengan pelatihan khusus di bidangnya</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Fasilitas dan peralatan medis modern berstandar internasional</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Perawatan menyeluruh dalam satu tempat</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Pendekatan pelayanan yang berfokus pada pasien</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Layanan darurat siap 24 jam setiap hari</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}