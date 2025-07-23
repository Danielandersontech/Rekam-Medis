import { Heart, Shield, Activity, Clock, Users, Award, CheckCircle } from "lucide-react";

export default function Tentang() {
  const keunggulan = [
    {
      icon: Heart,
      title: "Perawatan Berbasis Kasih Sayang",
      description: "Kami memberikan pelayanan dengan penuh empati dan perhatian",
      color: "text-red-500"
    },
    {
      icon: Shield,
      title: "Standar Keamanan Tinggi",
      description: "Prosedur ketat untuk menjamin keselamatan pasien",
      color: "text-blue-500"
    },
    {
      icon: Activity,
      title: "Teknologi Medis Terkini",
      description: "Peralatan modern untuk diagnosa dan perawatan akurat",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Layanan 24 Jam",
      description: "Tim medis siap membantu kapan saja Anda membutuhkan",
      color: "text-yellow-500"
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1681842883882-b5c1c9f37869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Tim Medis Profesional"
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg hidden lg:block">
              <div className="flex items-center">
                <Users className="w-10 h-10 mr-3" />
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm">Dokter Spesialis</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-primary">Rumah Sakit</span> Terpercaya
            </h2>
            <div className="divider w-20 before:bg-primary after:bg-primary h-1"></div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Sejak tahun 2005, kami berkomitmen memberikan pelayanan kesehatan terbaik dengan standar internasional. 
              Tim dokter berpengalaman dan perawat profesional siap memberikan perawatan holistik untuk seluruh keluarga Anda.
            </p>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-medium">Akreditasi JCI (Joint Commission International)</span>
              </div>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-medium">Penghargaan Hospital Excellence Award 2023</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-medium">Layanan Pasien Terbaik versi Kementerian Kesehatan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {keunggulan.map((item, index) => (
                <div key={index} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="card-body p-4">
                    <div className={`w-12 h-12 rounded-full bg-opacity-20 ${item.color} flex items-center justify-center mb-3`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="card-title text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="btn btn-primary px-8">
                Kenali Kami Lebih Dekat
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}