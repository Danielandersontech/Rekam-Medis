import { Heart, Shield, Award, Users, Activity, Clock } from "lucide-react";

const stats = [
  { number: "1000+", label: "Pasien yang bahagia", icon: Users },
  { number: "50+", label: "Dokter Ahli", icon: Award },
  { number: "15+", label: "Pengalaman bertahun-tahun", icon: Clock },
  { number: "100%", label: "Tingkat Keberhasilan", icon: Activity }
];

const values = [
  {
    icon: Heart,
    title: "Perawatan Penuh Kasih",
    description: "Kami memperlakukan setiap pasien dengan empati, rasa hormat, dan perhatian yang dipersonalisasi untuk memastikan kenyamanan dan penyembuhan."
  },
  {
    icon: Shield,
    title: "Kualitas & Keselamatan",
    description: "Komitmen kami terhadap standar medis tertinggi memastikan layanan perawatan kesehatan yang aman, efektif, dan andal."
  },
  {
    icon: Award,
    title: "Keunggulan",
    description: "Kami terus berupaya untuk menjadi yang terbaik dalam perawatan medis, teknologi, dan kepuasan pasien."
  },
  {
    icon: Activity,
    title: "Inovasi",
    description: "Kami menggunakan teknologi medis mutakhir dan perawatan inovatif untuk memberikan hasil terbaik."
  }
];

export default function Tentang() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className=" text-blue-800 py-16" 
       style={{ backgroundImage: 'url("https://manicauniversity.com/images/pictures/School_of_Medicine.png")' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Tentang MEDDICAL
          </h1>
          <p className="text-xl text-blue-900 max-w-2xl mx-auto">
            Memimpin dalam Keunggulan Medis dengan lebih dari 15 tahun pelayanan yang berdedikasi kepada komunitas kami
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop"
                alt="Medical Team"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Memberikan layanan kesehatan yang luar biasa melalui inovasi, kasih sayang, dan keunggulan dalam praktik medis. Kami berkomitmen untuk meningkatkan kesehatan dan kesejahteraan komunitas kami dengan memberikan perawatan medis berkualitas tinggi yang dipersonalisasi yang melebihi harapan.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi penyedia layanan kesehatan terkemuka yang diakui untuk perawatan pasien yang luar biasa, perawatan canggih, dan terobosan medis. Kami membayangkan masa depan yang lebih sehat di mana setiap pasien menerima perawatan medis kelas dunia dalam lingkungan yang penuh kasih dan mendukung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Dasar Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip ini memandu semua yang kami lakukan dan membentuk komitmen kami terhadap perawatan kesehatan yang luar biasa
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
              <p className="text-xl text-gray-600">
                Sebuah perjalanan penuh dedikasi, pertumbuhan, dan komitmen yang tak tergoyahkan terhadap keunggulan layanan kesehatan
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                  alt="Hospital Building"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Didirikan pada tahun 2008, MEDDICAL dimulai sebagai sebuah klinik kecil dengan visi besar: untuk menyediakan layanan kesehatan kelas dunia bagi masyarakat. Apa yang dimulai dengan tim yang terdiri dari 5 profesional yang berdedikasi telah berkembang menjadi fasilitas medis yang komprehensif yang melayani ribuan pasien setiap tahunnya.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Selama bertahun-tahun, kami telah memperluas layanan kami, mengadopsi teknologi medis mutakhir, dan membangun tim spesialis yang berkualifikasi tinggi. Komitmen kami terhadap peningkatan berkelanjutan dan perawatan yang berpusat pada pasien telah menjadikan kami sebagai nama tepercaya dalam bidang perawatan kesehatan.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Saat ini, kami terus tumbuh dan berkembang, selalu setia pada prinsip-prinsip pendirian kami, yaitu kasih sayang, keunggulan, dan inovasi dalam perawatan medis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kepemimpinan</h2>
            <p className="text-xl text-gray-600">
              Temui para profesional berpengalaman yang memimpin misi kami
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                position: "Chief Medical Officer",
                specialization: "Cardiology",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Dr. Michael Chen",
                position: "Head of Emergency Medicine",
                specialization: "Emergency Medicine",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Dr. Emily Rodriguez",
                position: "Director of Pediatrics",
                specialization: "Pediatrics",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                <p className="text-gray-600">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}