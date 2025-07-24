import { Heart, Brain, Baby, Bone, Eye, Stethoscope, Activity, Shield, Clock, Phone, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Heart,
    title: "Kardiologi",
    description: "Perawatan jantung komprehensif meliputi diagnosis, pengobatan, dan pencegahan penyakit kardiovaskular.",
    features: ["EKG & Uji Stres", "Kateterisasi Jantung", "Operasi Jantung", "Perawatan Pencegahan"],
    color: "bg-red-100 text-red-600",
    hoverColor: "hover:shadow-red-200" 
  },
  {
    icon: Brain,
    title: "Neurologi",
    description: "Perawatan khusus untuk gangguan sistem saraf, otak, dan sumsum tulang belakang.",
    features: ["Pencitraan Otak", "Pengobatan Stroke", "Perawatan Epilepsi", "Gangguan Memori"],
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:shadow-purple-200"
  },
  {
    icon: Baby,
    title: "Pediatri",
    description: "Layanan kesehatan khusus untuk bayi, anak-anak, dan remaja dari lahir hingga 18 tahun.",
    features: ["Pemeriksaan Kesehatan Anak", "Vaksinasi", "Pemantauan Pertumbuhan", "Perawatan Perkembangan"],
    color: "bg-pink-100 text-pink-600",
    hoverColor: "hover:shadow-pink-200"
  },
  {
    icon: Bone,
    title: "Ortopedi",
    description: "Penanganan cedera dan gangguan sistem muskuloskeletal yang memengaruhi tulang dan sendi.",
    features: ["Penggantian Sendi", "Kedokteran Olahraga", "Penanganan Patah Tulang", "Fisioterapi"],
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:shadow-orange-200"
  },
  {
    icon: Eye,
    title: "Oftalmologi",
    description: "Layanan perawatan mata lengkap termasuk koreksi penglihatan dan prosedur bedah.",
    features: ["Bedah Katarak", "LASIK", "Pengobatan Glaucoma", "Perawatan Retina"],
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:shadow-green-200"
  },
  {
    icon: Stethoscope,
    title: "Penyakit Dalam",
    description: "Pelayanan primer untuk orang dewasa yang berfokus pada pencegahan, diagnosis, dan pengobatan penyakit.",
    features: ["Pemeriksaan Tahunan", "Manajemen Penyakit Kronis", "Perawatan Pencegahan", "Skrining Kesehatan"],
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:shadow-blue-200"
  },
  {
    icon: Activity,
    title: "Kedokteran Darurat",
    description: "Layanan darurat 24/7 untuk kondisi medis mendesak dan situasi yang mengancam jiwa.",
    features: ["Perawatan Trauma", "Perawatan Kritis", "Bedah Darurat", "Layanan Ambulans"],
    color: "bg-red-100 text-red-700",
    hoverColor: "hover:shadow-red-300"
  },
  {
    icon: Shield,
    title: "Perawatan Pencegahan",
    description: "Layanan kesehatan preventif komprehensif untuk menjaga kesehatan optimal.",
    features: ["Skrining Kesehatan", "Vaksinasi", "Program Kebugaran", "Konseling Gaya Hidup"],
    color: "bg-indigo-100 text-indigo-600",
    hoverColor: "hover:shadow-indigo-200"
  }
];

const emergencyServices = [
  "Unit Gawat Darurat 24/7",
  "Bedah Trauma",
  "Unit Perawatan Intensif",
  "Layanan Ambulans",
  "Perawatan Jantung Darurat",
  "Tim Penanganan Stroke"
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/60"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Layanan Medis Kami
          </h1>
          <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto opacity-90">
            Layanan kesehatan komprehensif yang diberikan oleh para profesional medis ahli
            dengan teknologi canggih.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perawatan Medis Lengkap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menawarkan berbagai spesialisasi dan layanan medis untuk memenuhi semua
              kebutuhan kesehatan Anda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500
                           hover:shadow-xl ${service.hoverColor} transition-all duration-300 transform hover:-translate-y-2 group`}
              >
                <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300 ease-in-out`}>
                  <service.icon size={36} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-base text-gray-700 flex items-start">
                      <CheckCircle className="text-blue-500 w-5 h-5 mr-3 flex-shrink-0" />
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
      <section className="py-20 bg-blue-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-2 inline-block">
                Layanan Gawat Darurat
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Unit gawat darurat kami beroperasi 24/7 dengan dokter dan spesialis darurat
                berpengalaman yang siap menangani segala kondisi medis darurat. Kami menyediakan
                respon cepat dan perawatan darurat yang komprehensif.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {emergencyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 text-lg text-gray-700">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> 
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="tel:911" 
                  className="flex items-center justify-center space-x-3 bg-red-600 text-white px-8 py-4 rounded-full
                             hover:bg-red-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  <Phone size={20} />
                  <span>Hubungi 911 (Darurat)</span>
                </a>
                <a
                  href="tel:+628123456789" 
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full
                             hover:bg-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  <Phone size={20} />
                  <span>Telepon Langsung Rumah Sakit</span>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2"> 
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Departemen Gawat Darurat"
                className="rounded-2xl shadow-2xl ring-2 ring-blue-300 w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            Siap Menjadwalkan Janji Temu Anda?
          </h2>
          <p className="text-xl text-blue-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Para profesional medis kami siap memberikan Anda perawatan berkualitas tinggi.
            Pesan janji temu Anda hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-3 bg-white text-blue-700 px-10 py-4 rounded-full
                         hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
            >
              <Calendar size={20} />
              <span>Buat Janji Temu</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-3 border-2 border-white text-white px-10 py-4 rounded-full
                         hover:bg-white hover:text-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
            >
              <Phone size={20} />
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hours & Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-blue-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Clock className="mr-4 text-blue-600 w-8 h-8" />
                Jam Operasional
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700 text-lg">Senin - Jumat</span>
                  <span className="text-gray-600 text-lg">09:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700 text-lg">Sabtu</span>
                  <span className="text-gray-600 text-lg">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700 text-lg">Minggu</span>
                  <span className="text-gray-600 text-lg">10:00 AM - 04:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-bold text-red-600 text-lg">Darurat</span>
                  <span className="text-red-600 font-bold text-lg">Tersedia 24/7</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-blue-500">
              <h3 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-tight">
                Mengapa Memilih MEDDICAL?
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 py-1">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Profesional medis berpengalaman dengan pelatihan khusus.</span>
                </li>
                <li className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 py-1">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Peralatan dan fasilitas medis canggih.</span>
                </li>
                <li className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 py-1">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Perawatan komprehensif di satu tempat.</span>
                </li>
                <li className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 py-1">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Pendekatan yang berpusat pada pasien dalam layanan kesehatan.</span>
                </li>
                <li className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 py-1">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Layanan darurat 24/7 tersedia.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}