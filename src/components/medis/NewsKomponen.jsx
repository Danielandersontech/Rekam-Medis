import { CalendarDays, Clock, User } from "lucide-react";

const newsArticles = [
  {
    id: 1,
    title: "Cara Menjaga Kesehatan Jantung dengan Pola Hidup Sehat",
    date: "21 Nov 2023",
    author: "Dr. Babila Ebwele",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1600408986933-5feb4659ebff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEtlc2VoYXRhbiUyMEphbnR1bmd8ZW58MHx8MHx8fDA%3D",
    category: "Kardiologi",
    description: "Penelitian terbaru menunjukkan manfaat konsumsi makanan sehat dan olahraga teratur untuk kesehatan jantung. Artikel ini membahas tips praktis untuk menjaga jantung tetap sehat."
  },
  {
    id: 2,
    title: "Tips Menjaga Kesehatan Mental di Era Digital",
    date: "15 Nov 2023",
    author: "Dr. Maya Indah",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    category: "Kesehatan Mental",
    description: "Cara sederhana mengurangi stres dan kecemasan akibat penggunaan gadget berlebihan. Temukan strategi untuk menyeimbangkan kehidupan digital dan dunia nyata."
  },
  {
    id: 3,
    title: "Vaksinasi Musim Dingin: Yang Perlu Anda Ketahui",
    date: "10 Nov 2023",
    author: "Tim Medis",
    readTime: "3 menit",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    category: "Vaksinasi",
    description: "Persiapan menghadapi musim dingin dengan vaksinasi yang tepat. Pelajari jenis vaksin yang direkomendasikan dan jadwal yang optimal untuk perlindungan maksimal."
  },
  {
    id: 4,
    title: "Manfaat Olahraga 30 Menit Setiap Hari untuk Kesehatan",
    date: "5 Nov 2023",
    author: "Dr. Rudi Hermawan",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
    category: "Kesehatan Umum",
    description: "Rutinitas olahraga singkat yang bisa memberikan dampak besar bagi kesehatan. Temukan jenis olahraga yang sesuai dengan berbagai tingkat kebugaran dan usia."
  },
  {
    id: 5,
    title: "Pencegahan Dini Diabetes Tipe 2",
    date: "28 Okt 2023",
    author: "Dr. Siti Rahayu",
    readTime: "7 menit",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=300&h=200&fit=crop",
    category: "Penyakit Dalam",
    description: "Mengenali gejala awal dan faktor risiko diabetes tipe 2. Artikel ini memberikan panduan praktis untuk pencegahan melalui pola makan dan gaya hidup."
  },
  {
    id: 6,
    title: "Perawatan Kulit yang Tepat untuk Berbagai Usia",
    date: "20 Okt 2023",
    author: "Dr. Taufik Hidayat",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop",
    category: "Dermatologi",
    description: "Panduan lengkap perawatan kulit sesuai usia dan jenis kulit. Pelajari produk dan rutinitas yang direkomendasikan oleh ahli dermatologi."
  },
  {
    id: 7,
    title: "Mengatasi Nyeri Punggung Bawah Secara Alami",
    date: "15 Okt 2023",
    author: "Dr. Rudi Hermawan",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop",
    category: "Ortopedi",
    description: "Teknik dan latihan sederhana untuk meredakan nyeri punggung bawah tanpa obat. Artikel ini juga membahas kapan harus berkonsultasi dengan dokter."
  },
  {
    id: 8,
    title: "Pentingnya Pemeriksaan Kesehatan Rutin",
    date: "10 Okt 2023",
    author: "Tim Medis",
    readTime: "3 menit",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&h=200&fit=crop",
    category: "Kesehatan Umum",
    description: "Mengapa pemeriksaan kesehatan rutin penting untuk deteksi dini penyakit. Temukan jenis pemeriksaan yang direkomendasikan berdasarkan usia dan faktor risiko."
  }
];

export default function News(){
    return(
        <section className="py-16 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">
                INFORMASI KESEHATAN TERPERCAYA
              </h2>
              <p className="text-xl text-gray-600">
                Update terbaru seputar dunia kesehatan dan tips hidup sehat dari dokter spesialis kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsArticles.map((article) => (
                <div key={article.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all group h-full flex flex-col">
                  <figure className="px-4 pt-4 relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="rounded-xl h-48 w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="badge badge-primary absolute top-6 right-6">
                      {article.category}
                    </div>
                  </figure>
                  <div className="card-body p-4 flex-grow">
                    <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="card-title line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{article.description}</p>
                    <div className="card-actions justify-end mt-auto">
                      <button className="btn btn-sm btn-primary">Baca Selengkapnya</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button className="btn btn-outline btn-primary">
                Lihat Artikel Lainnya
              </button>
            </div>
          </div>
        </section>
    );
}