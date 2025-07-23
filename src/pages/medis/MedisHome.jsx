import { Link } from "react-router-dom";
import { Calendar, Phone, Clock, Heart, CheckCircle, Stethoscope, User, Shield } from "lucide-react";
import Tentang from "../../components/medis/TentangKomponen";
import Services from "../../components/medis/ServicesKomponen";
import Appointment from "../../components/medis/AppoinmentKomponen";
import Doctors from "../../components/medis/DoctorsKomponen";
import News from "../../components/medis/NewsKomponen";
import Spesialis from "../../components/medis/SpesialisKomponen";

export default function MedisHome() {
  const layananCepat = [
    {
      icon: Calendar,
      title: "Buat Janji Temu",
      description: "Konsultasi dengan dokter spesialis",
      link: "/medis/appointment",
      color: "btn-primary"
    },
    {
      icon: Phone,
      title: "Darurat",
      description: "Layanan gawat darurat 24 jam",
      link: "/medis/contact",
      color: "btn-secondary"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      description: "Buka setiap hari 07.00 - 21.00",
      link: "/medis/hours",
      color: "btn-accent"
    }
  ];

  const fiturUnggulan = [
    {
      icon: User,
      title: "Dokter Spesialis",
      description: "50+ dokter berpengalaman siap melayani"
    },
    {
      icon: Stethoscope,
      title: "Layanan Lengkap",
      description: "25+ spesialisasi medis tersedia"
    },
    {
      icon: CheckCircle,
      title: "Standar Internasional",
      description: "Akreditasi JCI untuk kualitas terbaik"
    },
    {
      icon: Shield,
      title: "Teknologi Modern",
      description: "Peralatan medis terkini untuk diagnosa akurat"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section
        className="hero min-h-screen bg-center bg-cover relative"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UnVtYWglMjBTYWtpdHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-4xl">
            <h1 className="mb-8 text-4xl md:text-6xl font-bold">
              <span className="block mb-4">KESEHATAN ANDA</span>
              <span className="text-3xl md:text-5xl text-primary">Prioritas Utama Kami</span>
            </h1>

            <p className="mb-12 text-xl">
              Memberikan pelayanan kesehatan terbaik dengan teknologi terkini dan tim dokter profesional
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {layananCepat.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`btn ${item.color} btn-lg flex-col h-auto py-6 hover:shadow-xl transition-all`}
                >
                  <item.icon className="w-8 h-8 mb-2" />
                  <span className="text-lg font-bold">{item.title}</span>
                  <span className="text-sm font-normal">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fiturUnggulan.map((item, index) => (
              <div key={index} className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
                <div className="card-body items-center text-center p-6">
                  <div className="bg-primary p-3 rounded-full text-white mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="card-title text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="bg-base-100">
        <Tentang />
        <Services />
        <Spesialis />
        <Doctors />
        <Appointment />
        <News />
      </div>

      {/* CTA Section */}
      <section className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Butuh Bantuan Medis?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu 24 jam. Hubungi segera untuk layanan darurat atau konsultasi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/medis/contact" className="btn btn-secondary btn-lg">
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Kami
            </Link>
            <Link to="/medis/appointment" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Buat Janji Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}