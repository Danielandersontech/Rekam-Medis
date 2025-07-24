import { Calendar, User, ArrowRight, Search, Filter } from "lucide-react";
import { useState } from "react";

const newsArticles = [
  {
    id: 1,
    title: "Konsumsi Sedang: Manfaat Potensial untuk Risiko Jantung",
    excerpt: "Studi terbaru menunjukkan bahwa konsumsi moderat minuman tertentu dapat memberikan manfaat kesehatan yang mengejutkan, khususnya terkait risiko kardiovaskular.",
    date: "21 Nov 21",
    author: "Dr. Sarah Johnson",
    category: "Research",
    image: "https://cdn1-production-images-kly.akamaized.net/TDzUEbPQ1vx3C9BGslxGmrvP3f4=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5059793/original/063083000_1734754458-1734750883123_tips-kesehatan-jantung.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Dukungan Komunitas: Kunci Kesejahteraan Mental",
    excerpt: "Sebuah pandangan metaforis tentang bagaimana sistem dukungan komunitas yang kuat berkontribusi terhadap kesehatan mental dan kesejahteraan individu.",
    date: "21 Nov 21",
    author: "Dr. Michael Chen",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Pentingnya Aktivitas Fisik untuk Kesehatan Jantung Optimal",
    excerpt: "Menjelajahi pentingnya aktivitas fisik dan olahraga di luar ruangan dalam menjaga kesehatan jantung dan mencegah penyakit.",
    date: "20 Nov 21",
    author: "Dr. Emily Rodriguez",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Mengapa Literasi Kesehatan Penting untuk Semua",
    excerpt: "Memahami tren literasi kesehatan yang terus berkembang dan dampaknya terhadap hasil akhir pasien serta perawatan pencegahan yang lebih baik.",
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
    image: "https://www.healthcareitnews.com/sites/hitn/files/styles/wide/public/2025-07/Virtual%2520Care-HITN_0.jpg.webp?itok=k8MHYUcA",
    featured: false
  }
];

const categories = ["All", "Research", "Mental Health", "Cardiology", "Public Health", "Oncology", "Technology"];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(6); 

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const articlesToDisplay = regularArticles.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 3); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-36 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: 'url("https://wahananews.co/photo/berita/dir062023/sebanyak-175-tenaga-perawat-asal-sumut-diberangkatkan-kerja-ke-luar-negeri_4w9TO2TyVh.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/85 to-blue-500/75 animate-fade-in"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-wide animate-slide-in-up">
            Wawasan Medis Terbaru
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto opacity-95 animate-fade-in-slow">
            Dapatkan informasi terkini mengenai penelitian, inovasi, dan tips kesehatan dari para ahli kami.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-20 bg-white shadow-inner-top">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-72 md:h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-5">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md">
                        Artikel Unggulan
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                        {featuredArticle.category}
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-700 mb-7 leading-relaxed text-lg">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-blue-500" />
                          <span>{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-blue-500" />
                          <span>{featuredArticle.date}</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-semibold transition-all duration-300 transform hover:translate-x-1">
                        <span>Baca Lebih Lanjut</span>
                        <ArrowRight size={18} />
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
      <section className="py-12 bg-gray-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-full focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-base shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-3 flex-wrap justify-center">
              <Filter size={20} className="text-gray-600 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md transform scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
              INFORMASI YANG LEBIH BAIK, KESEHATAN YANG LEBIH BAIK
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
              Telusuri berita dan artikel medis terbaru kami untuk tetap terinformasi tentang perkembangan kesehatan yang relevan.
            </p>
          </div>
          
          {articlesToDisplay.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl font-medium">Tidak ditemukan artikel yang sesuai dengan kriteria Anda.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {articlesToDisplay.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-700 transition duration-200">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-5 line-clamp-3 text-base leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1.5">
                          <User size={15} className="text-blue-500" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar size={15} className="text-blue-500" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium group">
                        <span>Baca</span>
                        <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {regularArticles.length > articlesToDisplay.length && (
            <div className="text-center mt-20">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 text-white px-12 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl animate-bounce-subtle"
              >
                Muat Lebih Banyak Artikel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-5 drop-shadow-md animate-fade-in">
              Tetap Terhubung dengan Informasi Kesehatan
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed opacity-90 animate-fade-in-delay">
              Berlangganan buletin kami untuk mendapatkan berita kesehatan terbaru, tips gaya hidup sehat, dan pembaruan medis langsung ke kotak masuk Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="flex-1 px-6 py-3.5 border border-blue-300 rounded-full focus:ring-4 focus:ring-blue-300 focus:border-transparent text-gray-800 text-lg shadow-inner-sm"
              />
              <button className="bg-white text-blue-700 px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl animate-pop-in">
                Berlangganan
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-6 opacity-80">
              Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}