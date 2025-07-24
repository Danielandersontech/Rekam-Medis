import { Heart, Shield, Award, Users, Activity, Clock } from "lucide-react";

const stats = [
  { number: "1000+", label: "Pasien Bahagia", icon: Users },
  { number: "50+", label: "Dokter Ahli", icon: Award },
  { number: "15+", label: "Tahun Pengalaman", icon: Clock },
  { number: "100%", label: "Tingkat Keberhasilan", icon: Activity }
];

const values = [
  {
    icon: Heart,
    title: "Perawatan Penuh Kasih",
    description: "Kami memperlakukan setiap pasien dengan empati, rasa hormat, dan perhatian personal untuk memastikan kenyamanan dan penyembuhan optimal."
  },
  {
    icon: Shield,
    title: "Kualitas & Keselamatan",
    description: "Komitmen kami terhadap standar medis tertinggi memastikan layanan perawatan kesehatan yang aman, efektif, dan dapat diandalkan."
  },
  {
    icon: Award,
    title: "Keunggulan Berkelanjutan",
    description: "Kami terus berupaya menjadi yang terbaik dalam perawatan medis, inovasi teknologi, dan kepuasan pasien yang tak tertandingi."
  },
  {
    icon: Activity,
    title: "Inovasi Medis",
    description: "Kami mengadopsi teknologi medis mutakhir dan perawatan inovatif untuk memberikan hasil terbaik dan solusi kesehatan terkini."
  }
];

export default function Tentang() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://manicauniversity.com/images/pictures/School_of_Medicine.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 to-blue-500/60"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Tentang <span className="bg-gradient-to-r from-blue-300 to-blue-100 text-transparent bg-clip-text">MEDDICAL</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto opacity-90">
            Memimpin dalam keunggulan medis dengan dedikasi lebih dari 15 tahun melayani komunitas kami.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <stat.icon className="text-white" size={28} />
                </div>
                <h3 className="text-4xl font-extrabold text-blue-700 mb-2">{stat.number}</h3>
                <p className="text-gray-700 text-lg font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.ctfassets.net/szez98lehkfm/NiElsXcsnFXKp7vN75wID/8be76ae8eb74f11ad2609833a945442f/MyIC_Inline_49857?fm=webp&w=490"
                alt="Tim Medis Sedang Berdiskusi"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-2 inline-block">Misi Kami</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Memberikan layanan kesehatan yang luar biasa melalui inovasi tanpa henti, kasih sayang tulus, dan keunggulan dalam setiap praktik medis. Kami berkomitmen untuk meningkatkan kesehatan dan kesejahteraan komunitas kami dengan menyediakan perawatan medis berkualitas tinggi yang dipersonalisasi dan melampaui ekspektasi.
                </p>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-2 inline-block">Visi Kami</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Menjadi penyedia layanan kesehatan terkemuka yang diakui secara global untuk perawatan pasien yang luar biasa, praktik medis canggih, dan terobosan inovatif. Kami membayangkan masa depan yang lebih sehat di mana setiap pasien menerima perawatan medis kelas dunia dalam lingkungan yang penuh kasih dan mendukung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Dasar Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prinsip-prinsip ini membimbing setiap langkah kami, membentuk komitmen tak tergoyahkan kami terhadap keunggulan layanan kesehatan.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-blue-600" size={36} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Kisah Kami</h2>
              <p className="text-xl text-gray-600">
                Sebuah perjalanan penuh dedikasi, pertumbuhan, dan komitmen tak tergoyahkan terhadap keunggulan layanan kesehatan.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="https://www.myhospitalnow.com/hospitals/storage/hospital_profile/DSC_1768-1793710086_1714391092.jpg"
                  alt="Gedung Rumah Sakit Modern"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Didirikan pada tahun 2008, MEDDICAL berawal dari sebuah klinik kecil dengan visi besar: menyediakan layanan kesehatan kelas dunia bagi masyarakat. Apa yang dimulai dengan tim yang terdiri dari 5 profesional berdedikasi telah berkembang menjadi fasilitas medis komprehensif yang melayani ribuan pasien setiap tahunnya.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Selama bertahun-tahun, kami terus memperluas jangkauan layanan kami, mengadopsi teknologi medis mutakhir, dan membangun tim spesialis yang sangat berkualitas. Komitmen kami terhadap peningkatan berkelanjutan dan perawatan yang berpusat pada pasien telah menjadikan kami nama tepercaya dalam bidang perawatan kesehatan.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hingga hari ini, kami terus tumbuh dan berkembang, selalu setia pada prinsip-prinsip pendirian kami: kasih sayang, keunggulan, dan inovasi dalam setiap aspek perawatan medis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tim Kepemimpinan Kami</h2>
            <p className="text-xl text-gray-600">
              Temui para profesional berpengalaman yang memimpin misi kami untuk memberikan layanan kesehatan terbaik.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Dr. Sarah Johnson",
                position: "Chief Medical Officer",
                specialization: "Kardiologi",
                image: "https://static.honestdocs.id/989x500/webp/system/blog_articles/main_hero_images/000/005/310/original/iStock-913714110_%281%29.jpg"
              },
              {
                name: "Dr. Michael Chen",
                position: "Kepala Gawat Darurat",
                specialization: "Kedokteran Gawat Darurat",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                name: "Dr. Emily Rodriguez",
                position: "Direktur Pediatri",
                specialization: "Pediatri",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center border-b-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200 shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-700 font-semibold mb-2 text-lg">{member.position}</p>
                <p className="text-gray-600 text-base">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}