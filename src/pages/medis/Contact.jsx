import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-blue-900 py-16 "
      style={{ backgroundImage: 'url("https://www.emblemhealth.com/content/dam/emblemhealth/images/providers/newsletter/GettyImages-1189304034_web.jpg")' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Hubungi kami
          </h1>
          <p className="text-xl text-blue-800">
            Kami siap membantu dan menjawab pertanyaan apa pun yang mungkin Anda miliki
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-blue-600" />
                  Kirimkan pesan kepada kami
                </h2>
                <p className="text-gray-600 mb-8">
                  Punya pertanyaan atau ingin membuat janji temu? Isi formulir di bawah ini dan kami akan menghubungi Anda sesegera mungkin.
                </p>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Depan *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan nama depan Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Belakang *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan nama belakang Anda"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat Email *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="masukkan alamat email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan nomor telepon Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <textarea 
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan pesan Anda di sini..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center"
                  >
                    <Send className="mr-2" size={18} />
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-blue-600" size={48} />
                  <h3 className="text-xl font-semibold text-blue-800">Peta Interaktif</h3>
                  <p className="text-blue-600">Temukan kami di lokasi utama kami</p>
                </div>
              </div>

              {/* Additional Contact Info */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kontak Cepat</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">Hotline Darurat</p>
                      <p className="text-gray-600">(237) 681-812-255</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">Pertanyaan Umum</p>
                      <p className="text-gray-600">filidule@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">Jam Kerja</p>
                      <p className="text-gray-600">Mon-Sun: 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition">
                    <Linkedin size={20} />
                  </a>
                </div>
                <p className="text-gray-600 mt-4">
                  Tetap terhubung dengan kami untuk mendapatkan tips kesehatan, berita, dan 
                  informasi terbaru tentang layanan kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}