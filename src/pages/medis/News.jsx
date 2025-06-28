import { Calendar, User, ArrowRight, Search, Filter } from "lucide-react";
import { useState } from "react";

const newsArticles = [
  {
    id: 1,
    title: "Segelas brendi setiap hari dapat membantu Anda hidup lebih dari 100 tahun",
    excerpt: "Studi terbaru menunjukkan bahwa konsumsi alkohol dalam jumlah sedang dapat memberikan manfaat kesehatan yang mengejutkan bagi umur panjang.",
    date: "21 Nov 21",
    author: "Dr. Sarah Johnson",
    category: "Research",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Tujuh kurcaci membantu sang putri menjadi bahagia",
    excerpt: "Sebuah pandangan metaforis tentang bagaimana sistem dukungan komunitas berkontribusi terhadap kesehatan mental dan kesejahteraan.",
    date: "21 Nov 21",
    author: "Dr. Michael Chen",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Mengapa ayam menyeberang jalan menuju kesehatan yang lebih baik?",
    excerpt: "Menjelajahi pentingnya aktivitas fisik dan olahraga di luar ruangan dalam menjaga kesehatan jantung.",
    date: "20 Nov 21",
    author: "Dr. Emily Rodriguez",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Ada beberapa alasan mengapa orang mungkin ingin membaca tentang kesehatan",
    excerpt: "Memahami tren literasi kesehatan yang terus berkembang dan dampaknya terhadap hasil akhir pasien dan perawatan pencegahan.",
    date: "19 Nov 21",
    author: "Dr. Akila Tanjee",
    category: "Public Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Terobosan dalam Pengobatan Kanker Menunjukkan Hasil yang Menjanjikan",
    excerpt: "Teknik imunoterapi baru menunjukkan tingkat keberhasilan yang luar biasa dalam mengobati berbagai jenis kanker.",
    date: "18 Nov 21",
    author: "Dr. David Wilson",
    category: "Oncology",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 6,
    title: "Masa Depan Telemedicine dalam Perawatan Kesehatan Pasca-Pandemi",
    excerpt: "Bagaimana konsultasi virtual membentuk kembali perawatan pasien dan membuat perawatan kesehatan lebih mudah diakses di seluruh dunia.",
    date: "17 Nov 21",
    author: "Dr. Lisa Park",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
    featured: false
  }
];

const categories = ["All", "Research", "Mental Health", "Cardiology", "Public Health", "Oncology", "Technology"];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Berita & Pembaruan Medis
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
           Tetap terinformasi dengan penelitian medis terbaru, tips kesehatan, dan inovasi perawatan kesehatan
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Unggulan
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {featuredArticle.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{featuredArticle.date}</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                        <span>Baca Lebih Lanjut</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              INFORMASI YANG LEBIH BAIK, KESEHATAN YANG LEBIH BAIK
            </h2>
            <p className="text-xl text-gray-600">
              Berita & Artikel Terbaru
            </p>
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ditemukan artikel yang sesuai dengan kriteria Anda.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
              Muat Lebih Banyak Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Health News
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Berlangganan buletin kami dan dapatkan berita kesehatan terbaru, kiat, dan pembaruan medis yang dikirimkan ke kotak masuk Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Berlangganan
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}