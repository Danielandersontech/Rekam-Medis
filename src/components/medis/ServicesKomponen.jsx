import {
  Heart,
  Brain,
  Activity,
  Shield,
  Baby,
  Bone,
  Eye,
  Stethoscope,
  Syringe,
  Microscope,
  Thermometer,
  Pill
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Pemeriksaan Jantung",
    description: "Pelayanan jantung terbaik dengan teknologi modern termasuk EKG, Treadmill Test, dan Ekokardiografi",
  },
  {
    icon: Brain,
    title: "Neurologi",
    description: "Penanganan profesional untuk gangguan sistem saraf termasuk EEG dan EMG",
  },
  {
    icon: Microscope,
    title: "Laboratorium",
    description: "Pemeriksaan darah lengkap, kimia darah, dan tes diagnostik lainnya dengan hasil akurat",
  },
  {
    icon: Shield,
    title: "Bank Darah",
    description: "Persediaan darah aman dan siap digunakan kapan saja dengan sistem penyimpanan modern",
  },
  {
    icon: Baby,
    title: "Pediatri",
    description: "Perawatan khusus untuk bayi dan anak-anak oleh dokter ahli tumbuh kembang",
  },
  {
    icon: Bone,
    title: "Ortopedi",
    description: "Penanganan masalah tulang dan sendi termasuk fisioterapi dan rehabilitasi",
  },
  {
    icon: Eye,
    title: "Oftalmologi",
    description: "Layanan kesehatan mata dengan alat canggih termasuk pemeriksaan retina dan LASIK",
  },
  {
    icon: Stethoscope,
    title: "Konsultasi Umum",
    description: "Layanan pemeriksaan umum oleh tenaga medis profesional untuk diagnosa awal",
  },
  {
    icon: Syringe,
    title: "Vaksinasi",
    description: "Program imunisasi lengkap untuk anak hingga dewasa dengan vaksin terjamin",
  },
  {
    icon: Activity,
    title: "Fisioterapi",
    description: "Terapi pemulihan untuk pasca operasi, stroke, atau cedera dengan alat modern",
  },
  {
    icon: Thermometer,
    title: "UGD 24 Jam",
    description: "Layanan gawat darurat siap siaga dengan tim dokter berpengalaman",
  },
  {
    icon: Pill,
    title: "Apotek",
    description: "Penyediaan obat lengkap dengan konsultasi farmasi profesional",
  }
];

export default function Services() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-2">
            Layanan Kesehatan Kami
          </h2>
          <div className="divider w-20 mx-auto"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai layanan kesehatan komprehensif untuk memenuhi kebutuhan medis Anda dan keluarga
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-lg text-white">
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-1">
                      {service.title}
                    </h4>
                    <p className="text-gray-600">{service.description}</p>
                    <button className="btn btn-link btn-sm p-0 mt-2 text-primary">
                      Selengkapnya →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-primary px-8">
            Lihat Semua Layanan
          </button>
        </div>
      </div>
    </section>
  );
}