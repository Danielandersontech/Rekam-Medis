import { Mail, Phone, Calendar, Star, Award, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Akila Tanjee",
    specialty: "NEUROLOGIST",
    experience: "15 years",
    education: "MD, Harvard Medical School",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Tanjee is a board-certified neurologist specializing in stroke treatment and brain disorders.",
    achievements: ["Top Neurologist Award 2023", "Best Patient Care Award", "Research Excellence Award"],
    availability: "Mon, Wed, Fri",
    rating: 4.9,
    patients: 1200
  },
  {
    id: 2,
    name: "Dr. Babila Ebwele",
    specialty: "RADIOLOGIST",
    experience: "12 years",
    education: "MD, Johns Hopkins University",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Ebwele is an expert in diagnostic imaging and interventional radiology procedures.",
    achievements: ["Excellence in Radiology Award", "Innovation in Medical Imaging", "Teaching Excellence Award"],
    availability: "Tue, Thu, Sat",
    rating: 4.8,
    patients: 950
  },
  {
    id: 3,
    name: "Dr. Tange Meh",
    specialty: "CARDIOLOGIST",
    experience: "18 years",
    education: "MD, Mayo Clinic",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Meh specializes in cardiac surgery and preventive cardiology with extensive experience.",
    achievements: ["Cardiac Surgery Excellence", "Lifetime Achievement Award", "Best Surgeon 2022"],
    availability: "Mon, Tue, Thu",
    rating: 4.9,
    patients: 1500
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    specialty: "PEDIATRICIAN",
    experience: "10 years",
    education: "MD, Stanford University",
    image: "https://images.unsplash.com/photo-1594824475968-5e0e86c4e9b8?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Johnson provides comprehensive pediatric care with a focus on child development and wellness.",
    achievements: ["Pediatric Care Excellence", "Child Health Advocate", "Community Service Award"],
    availability: "Mon, Wed, Fri",
    rating: 4.7,
    patients: 800
  },
  {
    id: 5,
    name: "Dr. Michael Chen",
    specialty: "ORTHOPEDIC SURGEON",
    experience: "14 years",
    education: "MD, UCLA Medical Center",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Chen specializes in joint replacement surgery and sports medicine treatments.",
    achievements: ["Orthopedic Surgery Award", "Sports Medicine Excellence", "Innovation in Surgery"],
    availability: "Tue, Wed, Thu",
    rating: 4.8,
    patients: 1100
  },
  {
    id: 6,
    name: "Dr. Emily Rodriguez",
    specialty: "DERMATOLOGIST",
    experience: "8 years",
    education: "MD, Northwestern University",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face",
    bio: "Dr. Rodriguez focuses on cosmetic and medical dermatology with advanced treatment options.",
    achievements: ["Dermatology Excellence", "Best Cosmetic Treatment", "Patient Satisfaction Award"],
    availability: "Mon, Tue, Fri",
    rating: 4.6,
    patients: 650
  }
];

export default function Doctors() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Dokter Ahli Kami
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
           Temui tim kami yang terdiri dari para profesional medis yang berkualifikasi tinggi dan berpengalaman yang berdedikasi untuk kesehatan Anda
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              PERAWATAN TERPERCAYA
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             Dokter kami berkomitmen untuk memberikan perawatan medis yang luar biasa dengan penuh kasih sayang dan keahlian
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm">{doctor.education}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock size={14} />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users size={14} />
                      <span>{doctor.patients}+ pasien</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Tersedia: {doctor.availability}</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.achievements.slice(0, 2).map((achievement, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to="/appointment"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-center text-sm font-medium"
                    >
                      Janji Temu Buku
                    </Link>
                    <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Siap Bertemu dengan Dokter Anda?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Jadwalkan janji temu dengan salah satu dokter ahli kami hari ini dan ambil langkah pertama menuju kesehatan yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Calendar size={18} />
              <span>Janji Temu Buku</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium"
            >
              <Phone size={18} />
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <Award className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-blue-200">Dokter Ahli</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-blue-200">Pasien yang bahagia</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-blue-200">Pengalaman bertahun-tahun</p>
            </div>
            <div>
              <Star className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">4.8</h3>
              <p className="text-blue-200">Peringkat Rata-rata</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}