import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Facebook, Twitter, Instagram, Linkedin, ChevronDown } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "EMERGENCY",
    content: "(237) 681-812-255",
    description: "Emergency hotline available 24/7",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: MapPin,
    title: "LOCATION",
    content: "0123 Some place, Some country",
    description: "Our main hospital location",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Mail,
    title: "EMAIL",
    content: "filidule@gmail.com",
    description: "Send us your queries anytime",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Clock,
    title: "WORKING HOURS",
    content: "09:00 - 20:00 Everyday",
    description: "Mon to Sun 9:00 AM to 8:00 PM",
    color: "bg-green-100 text-green-600"
  }
];

export default function Contact() {
  const [openFAQ, setOpenFAQ] = useState(null); 

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800"> 
      {/* Hero Section */}
      <section
        className="relative py-28 lg:py-40 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: 'url("https://www.emblemhealth.com/content/dam/emblemhealth/images/providers/newsletter/GettyImages-1189304034_web.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900/70 backdrop-brightness-75 animate-fade-in-bg"></div> 
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight animate-slide-in-up">
            Hubungi kami
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto opacity-95 animate-fade-in-slow tracking-wide">
            Kami siap membantu dan menjawab pertanyaan apa pun yang mungkin Anda miliki
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 -mt-16 relative z-20"> 
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }} 
              >
                <div className={`w-20 h-20 ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md transition-transform duration-300 group-hover:scale-110`}> {/* Larger icon circle, shadow */}
                  <info.icon size={30} className="transform group-hover:rotate-6 transition-transform duration-300" /> 
                </div>
                <h3 className="font-extrabold text-gray-900 mb-3 text-xl">{info.title}</h3> 
                <p className="text-xl font-bold text-gray-900 mb-2">{info.content}</p> 
                <p className="text-base text-gray-600">{info.description}</p> 
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"> 
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16"> 
            {/* Contact Form */}
            <div className="animate-slide-in-from-left"> 
              <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100"> 
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-8 flex items-center"> 
                  <MessageSquare className="mr-4 text-blue-600" size={30} /> 
                  Kirimkan pesan kepada kami
                </h2>
                <p className="text-gray-700 mb-10 leading-relaxed text-lg"> 
                  Punya pertanyaan atau ingin membuat janji temu? Isi formulir di bawah ini dan kami akan menghubungi Anda sesegera mungkin.
                </p>

                <form className="space-y-7"> 
                  <div className="grid md:grid-cols-2 gap-7"> 
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2"> 
                        Nama Depan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400" 
                        placeholder="Masukkan nama depan Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nama Belakang <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Masukkan nama belakang Anda"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-7">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="masukkan alamat email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Masukkan nomor telepon Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Subjek <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg appearance-none bg-white pr-10" 
                    >
                      <option value="">Pilih subjek</option>
                      <option value="appointment">Pertanyaan Janji Temu</option>
                      <option value="medical">Pertanyaan Medis</option>
                      <option value="billing">Pertanyaan Penagihan</option>
                      <option value="feedback">Umpan Balik</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                      placeholder="Masukkan pesan Anda di sini..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1 animate-pulse-light" // Gradient button, stronger shadow, transform on hover, pulse animation
                  >
                    <Send className="mr-3" size={20} /> 
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

            
            <div className="space-y-10 animate-slide-in-from-right"> 
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-80 flex items-center justify-center shadow-lg border border-blue-200"> 
                <div className="text-center">
                  <MapPin className="mx-auto mb-3 text-blue-600" size={56} /> 
                  <h3 className="text-2xl font-extrabold text-blue-800 mb-2">Peta Interaktif</h3> 
                  <p className="text-blue-700 text-lg">Temukan kami di lokasi utama kami</p> 
                </div>
              </div>

              {/* Additional Contact Info */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"> 
                <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Kontak Cepat</h3> 
                <div className="space-y-6"> 
                  <div className="flex items-start space-x-4"> 
                    <Phone className="text-blue-600 flex-shrink-0 mt-1" size={24} /> 
                    <div>
                      <p className="font-bold text-lg">Hotline Darurat</p> 
                      <p className="text-gray-700 text-base">(237) 681-812-255</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-bold text-lg">Pertanyaan Umum</p>
                      <p className="text-gray-700 text-base">filidule@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-bold text-lg">Jam Kerja</p>
                      <p className="text-gray-700 text-base">Mon-Sun: 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"> 
                <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Ikuti Kami</h3> 
                <div className="flex space-x-5 mb-6"> 
                  <a href="https://www.facebook.com/" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-md"> 
                    <Facebook size={22} />
                  </a>
                  <a href="https://x.com/" className="bg-blue-400 text-white p-4 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-md">
                    <Twitter size={22} />
                  </a>
                  <a href="https://www.instagram.com/" className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 shadow-md">
                    <Instagram size={22} />
                  </a>
                  <a href="https://www.linkedin.com/" className="bg-blue-800 text-white p-4 rounded-full hover:bg-blue-900 transition-all duration-300 transform hover:scale-110 shadow-md">
                    <Linkedin size={22} />
                  </a>
                </div>
                <p className="text-gray-700 text-base leading-relaxed"> 
                  Tetap terhubung dengan kami untuk mendapatkan tips kesehatan, berita, dan
                  informasi terbaru tentang layanan kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto"> 
            <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-14">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Bagaimana cara menjadwalkan janji temu?",
                  answer: "Anda dapat menjadwalkan janji temu dengan menelepon hotline kami, menggunakan sistem pemesanan online kami, atau mengunjungi rumah sakit kami secara langsung."
                },
                {
                  question: "Apa saja yang harus saya bawa pada saat janji temu?",
                  answer: "Harap bawa kartu identitas yang masih berlaku, kartu asuransi (jika ada), daftar obat yang sedang Anda konsumsi, dan rekam medis yang relevan."
                },
                {
                  question: "Apakah Anda menerima asuransi?",
                  answer: "Ya, kami menerima sebagian besar rencana asuransi utama. Silakan hubungi kami untuk memverifikasi apakah rencana spesifik Anda diterima."
                },
                {
                  question: "Apa saja prosedur darurat Anda?",
                  answer: "Untuk keadaan darurat, segera hubungi hotline darurat kami atau kunjungi departemen gawat darurat kami yang buka 24/7."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"> 
                  <button
                    className="flex justify-between items-center w-full p-6 text-left font-semibold text-gray-900 text-lg focus:outline-none transition-colors duration-200 hover:bg-gray-50"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFAQ === index ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 p-0' 
                      }`}
                  >
                    <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}