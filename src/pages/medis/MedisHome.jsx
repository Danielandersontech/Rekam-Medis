import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Phone,
  Clock,
  Heart,
  CheckCircle,
  Stethoscope,
  User,
  Shield,
} from "lucide-react";
import Tentang from "../../components/medis/TentangKomponen";
import Services from "../../components/medis/ServicesKomponen";
import Appointment from "../../components/medis/AppoinmentKomponen";
import Doctors from "../../components/medis/DoctorsKomponen";
import News from "../../components/medis/NewsKomponen";
import Spesialis from "../../components/medis/SpesialisKomponen";
import RumahSakitImage from "../../assets/RumahSakit.jpg";

export default function MedisHome() {
  const kataKunci = [
    "Sepenuh Hati",
    "Senyum",
    "Integritas",
    "Profesionalisme",
    "Peduli",
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % kataKunci.length);
        setFade(true);
      }, 300); // waktu animasi keluar
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const layananCepat = [
    {
      icon: Calendar,
      title: "Buat Janji Temu",
      description: "Konsultasi dengan dokter spesialis",
      link: "/medis/appointment",
    },
    {
      icon: Phone,
      title: "Darurat",
      description: "Layanan gawat darurat 24 jam",
      link: "/medis/contact",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      description: "Buka setiap hari 07.00 - 21.00",
      link: "/medis/hours",
    },
  ];

  const fiturUnggulan = [
    {
      icon: User,
      title: "Dokter Spesialis",
      description: "50+ dokter berpengalaman siap melayani",
    },
    {
      icon: Stethoscope,
      title: "Layanan Lengkap",
      description: "25+ spesialisasi medis tersedia",
    },
    {
      icon: CheckCircle,
      title: "Standar Internasional",
      description: "Akreditasi JCI untuk kualitas terbaik",
    },
    {
      icon: Shield,
      title: "Teknologi Modern",
      description: "Peralatan medis terkini untuk diagnosa akurat",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[90vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${RumahSakitImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50 z-0" />

        {/* Content */}
        <div className="hero-content text-center text-neutral-content relative z-10 flex flex-col items-center justify-center w-full">
          <div className="max-w-5xl">
            {/* Menggunakan inline style untuk fontFamily */}
            <h1
              className="mb-8 text-4xl md:text-4xl font-bold leading-tight text-primary"
              style={{ fontFamily: 'var(--font-poppins-extrabold)' }} // Menggunakan CSS variable
            >
              Kami Hadir untuk Memberikan Pelayanan dengan{" "}
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
                // Menggunakan inline style untuk fontFamily di teks yang beranimasi juga
                style={{ fontFamily: 'var(--font-poppins-extrabold)' }}
              >
                {kataKunci[index]}
              </span>
            </h1>

            <p className="mb-12 text-lg md:text-xl text-black">
  Pelayanan kesehatan terbaik dengan teknologi terkini dan dokter profesional
</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {layananCepat.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`flex flex-col items-center justify-center px-6 py-6 rounded-xl bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:scale-105`}
                >
                  <item.icon className="w-10 h-10 mb-3" />
                  <span className="text-lg font-semibold">{item.title}</span>
                  <span className="text-sm font-light text-center">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fiturUnggulan.map((item, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-md hover:shadow-xl transition-all p-6 text-center rounded-xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary p-4 rounded-full text-white">
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
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
      <section className="bg-primary text-primary-content py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Butuh Bantuan Medis?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu 24 jam. Hubungi segera untuk layanan darurat atau konsultasi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/medis/contact"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              <Phone className="w-5 h-5 mr-2" /> Hubungi Kami
            </Link>
            <Link
              to="/medis/appointment"
              className="btn btn-outline btn-lg text-white hover:bg-white hover:text-primary"
            >
              <Calendar className="w-5 h-5 mr-2" /> Buat Janji Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}