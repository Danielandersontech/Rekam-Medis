import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import './custom.css'

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
                <HelloWorld/>
            </Container>
        </div>
    )



// Jika Tanpa Components Check Form dan ResultCard

// src/assets/members.json
// [
//   {
//     "member_id": "M001",
//     "nama": "Daniel Anderson",
//     "email": "daniel@example.com",
//     "tipe_member": "platinum"
//   },
//   {
//     "member_id": "M002",
//     "nama": "Sarah Wijaya",
//     "email": "sarah@example.com",
//     "tipe_member": "gold"
//   },
//   {
//     "member_id": "M003",
//     "nama": "Budi Santoso",
//     "email": "budi@example.com",
//     "tipe_member": "silver"
//   },
//   {
//     "member_id": "M004",
//     "nama": "Ani Rahayu",
//     "email": "ani@example.com",
//     "tipe_member": "gold"
//   },
//   {
//     "member_id": "M005",
//     "nama": "Rudi Hermawan",
//     "email": "rudi@example.com",
//     "tipe_member": "platinum"
//   }
// ]

// src/assets/orders.json
// [
//   {
//     "order_id": 1001,
//     "nama_pemesan": "Daniel Anderson",
//     "email": "daniel@example.com",
//     "status": "diproses"
//   },
//   {
//     "order_id": 1002,
//     "nama_pemesan": "Sarah Wijaya",
//     "email": "sarah@example.com",
//     "status": "dikirim"
//   },
//   {
//     "order_id": 1003,
//     "nama_pemesan": "Budi Santoso",
//     "email": "budi@example.com",
//     "status": "selesai"
//   },
//   {
//     "order_id": 1004,
//     "nama_pemesan": "Ani Rahayu",
//     "email": "ani@example.com",
//     "status": "dibatalkan"
//   },
//   {
//     "order_id": 1005,
//     "nama_pemesan": "Rudi Hermawan",
//     "email": "rudi@example.com",
//     "status": "diterima"
//   }
// ]

// src/assets/products.json

// [
//   {
//     "id": 1,
//     "name": "Nasi Goreng Special",
//     "price": 35000,
//     "image": "https://media.istockphoto.com/id/977762732/id/foto/makan-siang-nasi-dan-telur-dadar-filipina-dengan-ayam-di-pantai.jpg?s=1024x1024&w=is&k=20&c=Jmd4Ei-QN3_f4WdC1qzDkS-Dg_ao2PA3wen24lqOIm8=",
//     "description": "Nasi goreng dengan campuran seafood dan ayam"
//   },
//   {
//     "id": 2,
//     "name": "Mie Ayam Bakso",
//     "price": 25000,
//     "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "description": "Mie ayam dengan bakso urat yang lezat"
//   },
//   {
//     "id": 3,
//     "name": "Sate Ayam",
//     "price": 30000,
//     "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "description": "Sate ayam dengan bumbu kacang spesial"
//   },
//   {
//     "id": 4,
//     "name": "Gado-Gado",
//     "price": 28000,
//     "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "description": "Sayuran segar dengan bumbu kacang khas"
//   },
//   {
//     "id": 5,
//     "name": "Soto Ayam",
//     "price": 27000,
//     "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "description": "Soto ayam dengan kuah kaldu yang gurih"
//   }
// ]

// src/assets/produk.json
// [
//   {
//     "kode_produk": "PD001",
//     "nama_produk": "Nasi Goreng Special",
//     "harga": 35000,
//     "stok": 15
//   },
//   {
//     "kode_produk": "PD002",
//     "nama_produk": "Mie Ayam Bakso",
//     "harga": 25000,
//     "stok": 0
//   },
//   {
//     "kode_produk": "PD003",
//     "nama_produk": "Sate Ayam",
//     "harga": 30000,
//     "stok": 8
//   },
//   {
//     "kode_produk": "PD004",
//     "nama_produk": "Gado-Gado",
//     "harga": 28000,
//     "stok": 0
//   },
//   {
//     "kode_produk": "PD005",
//     "nama_produk": "Soto Ayam",
//     "harga": 27000,
//     "stok": 12
//   }
// ]

// src/assets/rewards.json
// [
//   {
//     "nama": "Daniel Anderson",
//     "nomor_hp": "081234567890",
//     "poin": 500,
//     "status_member": "Platinum"
//   },
//   {
//     "nama": "Sarah Wijaya",
//     "nomor_hp": "082345678901",
//     "poin": 250,
//     "status_member": "Gold"
//   },
//   {
//     "nama": "Budi Santoso",
//     "nomor_hp": "083456789012",
//     "poin": 100,
//     "status_member": "Silver"
//   },
//   {
//     "nama": "Ani Rahayu",
//     "nomor_hp": "084567890123",
//     "poin": 50,
//     "status_member": "Basic"
//   },
//   {
//     "nama": "Rudi Hermawan",
//     "nomor_hp": "085678901234",
//     "poin": 750,
//     "status_member": "Platinum"
//   }
// ]

// src/assets/testimonials.json
// [
//   {
//     "id": 1,
//     "name": "Budi Santoso",
//     "date": "15 Jan 2025",
//     "comment": "Makanannya selalu fresh dan pengiriman cepat. Sudah langganan 2 tahun!",
//     "rating": 5,
//     "avatar": "https://avatar.iran.liara.run/public/1"
//   },
//   {
//     "id": 2,
//     "name": "Ani Wijaya",
//     "date": "10 Feb 2025",
//     "comment": "Pilihan menunya lengkap dan harganya terjangkau. Recommended banget!",
//     "rating": 4,
//     "avatar": "https://avatar.iran.liara.run/public/2"
//   },
//   {
//     "id": 3,
//     "name": "Rudi Hermawan",
//     "date": "5 Mar 2025",
//     "comment": "Pelayanannya ramah dan packaging rapi. Tidak pernah kecewa order di Sedap.",
//     "rating": 5,
//     "avatar": "https://avatar.iran.liara.run/public/3"
//   },
//   {
//     "id": 4,
//     "name": "Siti Rahayu",
//     "date": "28 Mar 2025",
//     "comment": "Promo-promonya menarik dan aplikasinya mudah digunakan.",
//     "rating": 4,
//     "avatar": "https://avatar.iran.liara.run/public/4"
//   },
//   {
//     "id": 5,
//     "name": "Dewi Kurnia",
//     "date": "12 Apr 2025",
//     "comment": "Makanannya persis seperti di gambar. Rasanya enak dan porsinya banyak.",
//     "rating": 5,
//     "avatar": "https://avatar.iran.liara.run/public/5"
//   }
// ]


// src/components/GuestFooter.jsx
// // components/GuestFooter.jsx
// export default function GuestFooter() {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold text-green-400 mb-4">Sedap<span className="text-white">.</span></h3>
//             <p className="text-gray-400">Delicious food delivered to your doorstep.</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//             <p className="text-gray-400">Email: info@sedap.com</p>
//             <p className="text-gray-400">Phone: +62 123 4567 890</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
//               <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
//               <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Partners</h4>
//             <div className="flex space-x-4">
//               <img src="https://avatar.iran.liara.run/public/25" alt="Partner 1" className="h-10" />
//               <img src="https://avatar.iran.liara.run/public/10" alt="Partner 2" className="h-10" />
//               <img src="https://avatar.iran.liara.run/public/1" alt="Partner 3" className="h-10" />
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>© 2025 Sedap. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// src/components/GuestHeader.jsx
// // components/GuestHeader.jsx
// import { Link } from "react-router-dom";

// export default function GuestHeader() {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to="/guest" className="text-3xl font-bold text-green-600">
//             Sedap<span className="text-green-800">.</span>
//           </Link>
//         </div>
//         <nav className="hidden md:flex space-x-8">
//           <Link to="/guest" className="text-gray-700 hover:text-green-600">Home</Link>
//           <Link to="/guest/about" className="text-gray-700 hover:text-green-600">About</Link>
//           <Link to="/guest/products" className="text-gray-700 hover:text-green-600">Products</Link>
//           <Link to="/guest/testimonials" className="text-gray-700 hover:text-green-600">Testimonials</Link>
//         </nav>
//         <div className="flex space-x-4">
//           <Link to="/login" className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50">
//             Login
//           </Link>
//           <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//             Register
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }



// src/layouts/GuestLayout.jsx
// // layouts/GuestLayout.jsx
// import { Outlet } from "react-router-dom";
// import GuestHeader from "../components/GuestHeader";
// import GuestFooter from "../components/GuestFooter";

// export default function GuestLayout() {
//     return (
//         <div className="flex flex-col min-h-screen">
//             <GuestHeader />
//             <main className="flex-grow">
//                 <Outlet />
//             </main>
//             <GuestFooter />
//         </div>
//     );
// }


// src/pages/guest/Home.jsx
// // pages/guest/Home.jsx
// import { Link } from "react-router-dom";
// import products from "../../assets/products.json";
// import testimonials from "../../assets/testimonials.json";

// export default function GuestHome() {
//     return (
//         <div>
//             {/* Hero Section */}
//             <section className="bg-green-50 py-20">
//                 <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//                     <div className="md:w-1/2 mb-10 md:mb-0">
//                         <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                             Makanan Lezat <span className="text-green-600">Diantar</span> ke Pintu Rumah Anda
//                         </h1>
//                         <p className="text-lg text-gray-600 mb-8">
//                             Pesan makanan favorit Anda dari restoran terbaik di kota dan nikmati pengalaman pengantaran yang mudah dan cepat.
//                         </p>
//                         <div className="flex space-x-4">
//                             <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                                 Mulai Sekarang
//                             </Link>
//                             <Link to="/guest/products" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
//                                 Lihat Menu
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="md:w-1/2">
//                         <img
//                             src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
//                             alt="Makanan Lezat"
//                             className="rounded-lg shadow-xl"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* About Section */}
//             <section className="py-20">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Memilih Sedap?</h2>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                             Kami berkomitmen untuk memberikan Anda pengalaman bersantap terbaik dengan pilihan restoran yang kurasi dan pengantaran cepat.
//                         </p>
//                     </div>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="text-green-600 text-3xl mb-4">🚀</div>
//                             <h3 className="text-xl font-semibold mb-2">Pengantaran Cepat</h3>
//                             <p className="text-gray-600">Makanan Anda akan sampai dalam waktu kurang dari 30 menit atau gratis.</p>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="text-green-600 text-3xl mb-4">🍽️</div>
//                             <h3 className="text-xl font-semibold mb-2">Pilihan Beragam</h3>
//                             <p className="text-gray-600">Pilih dari ratusan restoran dan ribuan menu makanan.</p>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="text-green-600 text-3xl mb-4">💰</div>
//                             <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
//                             <p className="text-gray-600">Nikmati diskon eksklusif dan hadiah loyalitas.</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Featured Products */}
//             <section className="py-20 bg-gray-50">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl font-bold text-gray-800 mb-4">Menu Favorit Kami</h2>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                             Berikut beberapa menu favorit pelanggan kami. Coba sekarang juga!
//                         </p>
//                     </div>
//                     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {products.slice(0, 5).map((product) => (
//                             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
//                                     <p className="text-green-600 font-bold">Rp{product.price.toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="text-center mt-8">
//                         <Link to="/guest/products" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
//                             Lihat Semua Produk
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
            // <section className="py-20">
            //     <div className="container mx-auto px-4">
            //         <div className="text-center mb-12">
            //             <h2 className="text-3xl font-bold text-gray-800 mb-4">Apa Kata Pelanggan Kami</h2>
            //             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            //                 Jangan hanya percaya pada kata kami. Berikut adalah pendapat para pelanggan tentang layanan kami.
            //             </p>
            //         </div>
            //         <div className="grid md:grid-cols-3 gap-8">
            //             {testimonials.map((testimonial) => (
            //                 <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            //                     <div className="flex items-center mb-4">
            //                         <img
            //                             src={testimonial.avatar}
            //                             alt={testimonial.name}
            //                             className="w-12 h-12 rounded-full mr-4"
            //                         />
            //                         <div>
            //                             <h4 className="font-semibold">{testimonial.name}</h4>
            //                             <p className="text-gray-500 text-sm">{testimonial.date}</p>
            //                         </div>
            //                     </div>
            //                     <p className="text-gray-600">"{testimonial.comment}"</p>
            //                     <div className="flex mt-4">
            //                         {[...Array(testimonial.rating)].map((_, i) => (
            //                             <span key={i} className="text-yellow-400">★</span>
            //                         ))}
            //                     </div>
            //                 </div>
            //             ))}
            //         </div>
            //     </div>
            // </section>
//         </div>
//     );
// }



// src/pages/guest/MembershipCheck.jsx
// import { useState } from "react";
// import membersData from "../../assets/members.json";

// export default function MembershipCheck() {
//   const [email, setEmail] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     // Validation
//     if (!email) {
//       setError("Email tidak boleh kosong");
//       return;
//     }
    
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setError("Format email tidak valid");
//       return;
//     }
    
//     // Find member
//     const member = membersData.find((m) => m.email === email);
    
//     if (member) {
//       setResult(member);
//     } else {
//       setResult({ notFound: true });
//     }
//   };

//   const getMemberColor = (type) => {
//     switch (type) {
//       case "platinum":
//         return "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800";
//       case "gold":
//         return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800";
//       case "silver":
//         return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-md">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Cek Keanggotaan
//         </h2>

//         <form onSubmit={handleCheck} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Masukkan email Anda"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//           >
//             Cek Keanggotaan
//           </button>
//         </form>

//         {result && (
//           <div className="mt-6">
//             {result.notFound ? (
//               <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <span className="text-red-500 mr-2">❌</span>
//                   <p>Email tidak terdaftar sebagai member.</p>
//                 </div>
//               </div>
//             ) : (
//               <div className={`${getMemberColor(result.tipe_member)} p-4 rounded-lg border-l-4 ${
//                 result.tipe_member === "platinum" ? "border-gray-500" :
//                 result.tipe_member === "gold" ? "border-yellow-500" :
//                 "border-gray-400"
//               }`}>
//                 <div className="flex items-center">
//                   <span className="mr-2">
//                     {result.tipe_member === "platinum" ? "💎" :
//                      result.tipe_member === "gold" ? "🏆" : "🥈"}
//                   </span>
//                   <p className="font-semibold">
//                     Selamat datang, {result.nama}! Anda adalah member{" "}
//                     <span className="capitalize">{result.tipe_member}</span>.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/guest/OrderCheck.jsx
// import { useState } from "react";
// import ordersData from "../../assets/orders.json";

// export default function OrderCheck() {
//   const [email, setEmail] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     // Validation
//     if (!email || !orderId) {
//       setError("Email dan Nomor Pesanan tidak boleh kosong");
//       return;
//     }
    
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setError("Format email tidak valid");
//       return;
//     }
    
//     if (!/^\d+$/.test(orderId)) {
//       setError("Nomor Pesanan harus berupa angka");
//       return;
//     }
    
//     // Find order
//     const order = ordersData.find(
//       (o) => o.email === email && o.order_id === parseInt(orderId)
//     );
    
//     if (order) {
//       setResult(order);
//     } else {
//       setResult({ notFound: true });
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "diproses":
//         return "bg-blue-100 text-blue-800";
//       case "dikirim":
//         return "bg-yellow-100 text-yellow-800";
//       case "selesai":
//         return "bg-green-100 text-green-800";
//       case "dibatalkan":
//         return "bg-red-100 text-red-800";
//       case "diterima":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-md">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Cek Status Pesanan
//         </h2>

//         <form onSubmit={handleCheck} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Masukkan email Anda"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Nomor Pesanan</label>
//             <input
//               type="text"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//               placeholder="Masukkan nomor pesanan"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//           >
//             Cek Status
//           </button>
//         </form>

//         {result && (
//           <div className="mt-6">
//             {result.notFound ? (
//               <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <span className="text-red-500 mr-2">❌</span>
//                   <p>Data pesanan tidak ditemukan. Periksa kembali email dan nomor pesanan Anda.</p>
//                 </div>
//               </div>
//             ) : (
//               <div className={`${getStatusColor(result.status)} p-4 rounded-lg border-l-4 ${
//                 result.status === "diproses" ? "border-blue-500" :
//                 result.status === "dikirim" ? "border-yellow-500" :
//                 result.status === "selesai" ? "border-green-500" :
//                 result.status === "dibatalkan" ? "border-red-500" :
//                 "border-purple-500"
//               }`}>
//                 <div className="flex items-center">
//                   <span className="mr-2">
//                     {result.status === "diproses" ? "🔄" :
//                      result.status === "dikirim" ? "🚚" :
//                      result.status === "selesai" ? "✅" :
//                      result.status === "dibatalkan" ? "❌" : "📦"}
//                   </span>
//                   <p className="font-semibold">
//                     Pesanan atas nama {result.nama_pemesan} dengan ID {result.order_id} sedang dalam status{" "}
//                     <span className="capitalize">{result.status}</span>.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/guest/RewardCheck.jsx
// import { useState } from "react";

// // For Vite, we can directly import JSON
// import rewardsData from "../../assets/rewards.json";

// export default function RewardCheck() {
//   const [phone, setPhone] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!phone) {
//       setError("Nomor HP tidak boleh kosong");
//       return;
//     }
    
//     if (phone.length < 10 || !/^\d+$/.test(phone)) {
//       setError("Nomor HP harus minimal 10 digit angka");
//       return;
//     }
    
//     const customer = rewardsData.find(r => r.nomor_hp === phone);
//     if (customer) {
//       setResult(customer);
//     } else {
//       setResult({ notFound: true });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-md">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cek Poin Reward Sedap</h2>
        
//         <form onSubmit={handleCheck} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Nomor HP</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Masukkan nomor HP Anda"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//           >
//             Cek Poin
//           </button>
//         </form>

//         {result && (
//           <div className={`mt-6 p-4 rounded-lg ${result.notFound ? "bg-red-100 border-l-4 border-red-500" : "bg-green-100 border-l-4 border-green-500"}`}>
//             {result.notFound ? (
//               <div className="flex items-center">
//                 <span className="text-red-500 mr-2">❌</span>
//                 <p>Nomor HP tidak terdaftar di sistem reward Sedap.</p>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex items-center mb-2">
//                   <span className="text-green-500 mr-2">🎉</span>
//                   <p className="font-semibold">Selamat {result.nama}, Anda memiliki {result.poin} poin</p>
//                 </div>
//                 <p>Status Member: <span className={`font-medium ${
//                   result.status_member === 'Platinum' ? 'text-purple-600' :
//                   result.status_member === 'Gold' ? 'text-yellow-600' :
//                   result.status_member === 'Silver' ? 'text-gray-600' :
//                   'text-blue-600'
//                 }`}>{result.status_member}</span></p>
//                 <p className="mt-2">Tukarkan segera dengan hadiah menarik!</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/guest/StockCheck.jsx
// import { useState } from "react";
// import productsData from "../../assets/produk.json";

// export default function StockCheck() {
//   const [productCode, setProductCode] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     // Validation
//     if (!productCode) {
//       setError("Kode produk tidak boleh kosong");
//       return;
//     }
    
//     if (productCode.length < 4) {
//       setError("Kode produk harus minimal 4 karakter");
//       return;
//     }
    
//     // Find product
//     const product = productsData.find(
//       (p) => p.kode_produk.toLowerCase() === productCode.toLowerCase()
//     );
    
//     if (product) {
//       setResult(product);
//     } else {
//       setResult({ notFound: true });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-md">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Cek Ketersediaan Produk
//         </h2>

//         <form onSubmit={handleCheck} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Kode Produk</label>
//             <input
//               type="text"
//               value={productCode}
//               onChange={(e) => setProductCode(e.target.value)}
//               placeholder="Masukkan kode produk"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//           >
//             Cek Stok
//           </button>
//         </form>

//         {result && (
//           <div className="mt-6">
//             {result.notFound ? (
//               <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <span className="text-red-500 mr-2">❌</span>
//                   <p>Kode produk tidak ditemukan.</p>
//                 </div>
//               </div>
//             ) : result.stok > 0 ? (
//               <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <span className="text-green-500 mr-2">✅</span>
//                   <div>
//                     <p className="font-semibold">
//                       Produk {result.nama_produk} tersedia dengan harga Rp{result.harga.toLocaleString()}.
//                     </p>
//                     <p className="mt-1">Stok tersedia: {result.stok}</p>
//                   </div>
//                 </div>
//                 <div className="mt-3 text-center">
//                   <span role="img" aria-label="shopping-cart" className="text-3xl">
//                     🛒
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg relative">
//                 <div className="flex items-center">
//                   <span className="text-yellow-500 mr-2">⚠️</span>
//                   <p className="font-semibold">
//                     Produk {result.nama_produk} saat ini sedang habis.
//                   </p>
//                 </div>
//                 <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                   OUT OF STOCK
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// App.jsx
// import "./assets/tailwind.css";
// import React, { Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Loading from "./components/Loading";
// import GuestLayout from "./layouts/GuestLayout";
// import GuestHome from "./pages/guest/Home";
// import RewardCheck from "./pages/guest/RewardCheck";
// import OrderCheck from "./pages/guest/OrderCheck";
// import MembershipCheck from "./pages/guest/MembershipCheck";
// import StockCheck from "./pages/guest/StockCheck";
// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Orders = React.lazy(() => import("./pages/Orders"));
// const Customers = React.lazy(() => import("./pages/Customers"));
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
// const Login = React.lazy(() => import("./pages/auth/Login"));
// const Register = React.lazy(() => import("./pages/auth/Register"));
// const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// const Error400 = React.lazy(() => import("./pages/Error400"));
// const Error401 = React.lazy(() => import("./pages/Error401"));
// const Error403 = React.lazy(() => import("./pages/Error403"));
// const Error404 = React.lazy(() => import("./pages/Error404"));
// const Users = React.lazy(() => import("./pages/User"));

// function App() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Routes>
//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot" element={<Forgot />} />
//           <Route path="*" element={<Error404 />} />
//         </Route>

//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/customers" element={<Customers />} />
//           <Route path="/user" element={<Users />} />
//           <Route path="*" element={<Error404 />} />
//         </Route>

//         <Route path="/error400" element={<Error400 />} />
//         <Route path="/error401" element={<Error401 />} />
//         <Route path="/error403" element={<Error403 />} />
//         <Route path="/error404" element={<Error404 />} />

//         <Route element={<GuestLayout />}>
//           <Route path="/guest" element={<GuestHome />} />
//           <Route path="/guest/reward-check" element={<RewardCheck />} />
//           <Route path="/guest/order-check" element={<OrderCheck/>} />
//           <Route path="/guest/membership-check" element={<MembershipCheck/>} />
//           <Route path="/guest/stock-check" element={<StockCheck/>} />
//         </Route>

//       </Routes>
//     </Suspense>
//   );
// }

// export default App;



// Jika dengan Components Check Form dan ResultCard
// src/components/CheckForm.jsx
// export default function CheckForm({
//   title,
//   inputs,
//   buttonText,
//   onSubmit,
//   error,
//   children
// }) {
//   return (
//     <div className="container mx-auto px-4 py-12 max-w-md">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           {title}
//         </h2>

//         <form onSubmit={onSubmit} className="space-y-4">
//           {inputs.map((input, index) => (
//             <div key={index}>
//               <label className="block text-gray-700 mb-2">{input.label}</label>
//               <input
//                 type={input.type}
//                 value={input.value}
//                 onChange={input.onChange}
//                 placeholder={input.placeholder}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           ))}

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//           >
//             {buttonText}
//           </button>
//         </form>

//         {children}
//       </div>
//     </div>
//   );
// }

// src/components/CheckForm.jsx
// export default function ResultCard({ 
//   type = 'info', 
//   icon, 
//   message,
//   additionalInfo,
//   outOfStock,
//   children 
// }) {
//   const typeStyles = {
//     success: 'bg-green-100 border-green-500 text-green-800',
//     error: 'bg-red-100 border-red-500 text-red-800',
//     warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
//     info: 'bg-blue-100 border-blue-500 text-blue-800',
//     platinum: 'bg-gradient-to-r from-gray-200 to-gray-300 border-gray-500 text-gray-800',
//     gold: 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-500 text-yellow-800',
//     silver: 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400 text-gray-700'
//   };

//   return (
//     <div className={`mt-6 p-4 rounded-lg border-l-4 ${typeStyles[type]} relative`}>
//       {outOfStock && (
//         <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//           OUT OF STOCK
//         </div>
//       )}
//       <div className="flex items-center">
//         {icon && <span className="mr-2">{icon}</span>}
//         <div>
//           <p className="font-semibold">{message}</p>
//           {additionalInfo && <p className="mt-1">{additionalInfo}</p>}
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }



// src/pages/guest/MembershipCheck.jsx
// import { useState } from "react";
// import membersData from "../../assets/members.json";
// import CheckForm from "../../components/CheckForm";
// import ResultCard from "../../components/ResultCard";

// export default function MembershipCheck() {
//   const [email, setEmail] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!email) {
//       setError("Email tidak boleh kosong");
//       return;
//     }
    
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setError("Format email tidak valid");
//       return;
//     }
    
//     const member = membersData.find((m) => m.email === email);
//     setResult(member ? member : { notFound: true });
//   };

//   const getMemberIcon = (type) => {
//     switch (type) {
//       case "platinum": return "💎";
//       case "gold": return "🏆";
//       case "silver": return "🥈";
//       default: return "👤";
//     }
//   };

//   return (
//     <CheckForm
//       title="Cek Keanggotaan"
//       inputs={[
//         {
//           label: "Email",
//           type: "email",
//           value: email,
//           onChange: (e) => setEmail(e.target.value),
//           placeholder: "Masukkan email Anda"
//         }
//       ]}
//       buttonText="Cek Keanggotaan"
//       onSubmit={handleCheck}
//       error={error}
//     >
//       {result && (
//         result.notFound ? (
//           <ResultCard
//             type="error"
//             icon="❌"
//             message="Email tidak terdaftar sebagai member."
//           />
//         ) : (
//           <ResultCard
//             type={result.tipe_member}
//             icon={getMemberIcon(result.tipe_member)}
//             message={`Selamat datang, ${result.nama}!`}
//             additionalInfo={`Anda adalah member ${result.tipe_member.charAt(0).toUpperCase() + result.tipe_member.slice(1)}`}
//           />
//         )
//       )}
//     </CheckForm>
//   );
// }


// src/pages/guest/OrderCheck.jsx
// import { useState } from "react";
// import ordersData from "../../assets/orders.json";
// import CheckForm from "../../components/CheckForm";
// import ResultCard from "../../components/ResultCard";

// export default function OrderCheck() {
//   const [email, setEmail] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!email || !orderId) {
//       setError("Email dan Nomor Pesanan tidak boleh kosong");
//       return;
//     }
    
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setError("Format email tidak valid");
//       return;
//     }
    
//     if (!/^\d+$/.test(orderId)) {
//       setError("Nomor Pesanan harus berupa angka");
//       return;
//     }
    
//     const order = ordersData.find(o => o.email === email && o.order_id === parseInt(orderId));
//     setResult(order ? order : { notFound: true });
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "diproses": return "🔄";
//       case "dikirim": return "🚚";
//       case "selesai": return "✅";
//       case "dibatalkan": return "❌";
//       default: return "📦";
//     }
//   };

//   return (
//     <CheckForm
//       title="Cek Status Pesanan"
//       inputs={[
//         {
//           label: "Email",
//           type: "email",
//           value: email,
//           onChange: (e) => setEmail(e.target.value),
//           placeholder: "Masukkan email Anda"
//         },
//         {
//           label: "Nomor Pesanan",
//           type: "text",
//           value: orderId,
//           onChange: (e) => setOrderId(e.target.value),
//           placeholder: "Masukkan nomor pesanan"
//         }
//       ]}
//       buttonText="Cek Status"
//       onSubmit={handleCheck}
//       error={error}
//     >
//       {result && (
//         result.notFound ? (
//           <ResultCard
//             type="error"
//             icon="❌"
//             message="Data pesanan tidak ditemukan. Periksa kembali email dan nomor pesanan Anda."
//           />
//         ) : (
//           <ResultCard
//             type={
//               result.status === "diproses" ? "info" :
//               result.status === "dikirim" ? "warning" :
//               result.status === "selesai" ? "success" :
//               result.status === "dibatalkan" ? "error" : "info"
//             }
//             icon={getStatusIcon(result.status)}
//             message={`Pesanan atas nama ${result.nama_pemesan} dengan ID ${result.order_id}`}
//             additionalInfo={`Status: ${result.status.charAt(0).toUpperCase() + result.status.slice(1)}`}
//           />
//         )
//       )}
//     </CheckForm>
//   );
// }


// src/pages/guest/RewardCheck.jsx
// import { useState } from "react";
// import rewardsData from "../../assets/rewards.json";
// import CheckForm from "../../components/CheckForm";
// import ResultCard from "../../components/ResultCard";

// export default function RewardCheck() {
//   const [phone, setPhone] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!phone) {
//       setError("Nomor HP tidak boleh kosong");
//       return;
//     }
    
//     if (phone.length < 10 || !/^\d+$/.test(phone)) {
//       setError("Nomor HP harus minimal 10 digit angka");
//       return;
//     }
    
//     const customer = rewardsData.find(r => r.nomor_hp === phone);
//     setResult(customer ? customer : { notFound: true });
//   };

//   return (
//     <CheckForm
//       title="Cek Poin Reward Sedap"
//       inputs={[
//         {
//           label: "Nomor HP",
//           type: "text",
//           value: phone,
//           onChange: (e) => setPhone(e.target.value),
//           placeholder: "Masukkan nomor HP Anda"
//         }
//       ]}
//       buttonText="Cek Poin"
//       onSubmit={handleCheck}
//       error={error}
//     >
//       {result && (
//         result.notFound ? (
//           <ResultCard
//             type="error"
//             icon="❌"
//             message="Nomor HP tidak terdaftar di sistem reward Sedap."
//           />
//         ) : (
//           <ResultCard
//             type={result.status_member.toLowerCase()}
//             icon="🎉"
//             message={`Selamat ${result.nama}, Anda memiliki ${result.poin} poin`}
//             additionalInfo={
//               <>
//                 Status Member: <span className="capitalize">{result.status_member}</span>
//                 <p className="mt-2">Tukarkan segera dengan hadiah menarik!</p>
//               </>
//             }
//           />
//         )
//       )}
//     </CheckForm>
//   );
// }


// src/pages/guest/StockCheck.jsx
// import { useState } from "react";
// import productsData from "../../assets/produk.json";
// import CheckForm from "../../components/CheckForm";
// import ResultCard from "../../components/ResultCard";

// export default function StockCheck() {
//   const [productCode, setProductCode] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleCheck = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!productCode) {
//       setError("Kode produk tidak boleh kosong");
//       return;
//     }
    
//     if (productCode.length < 4) {
//       setError("Kode produk harus minimal 4 karakter");
//       return;
//     }
    
//     const product = productsData.find(
//       (p) => p.kode_produk.toLowerCase() === productCode.toLowerCase()
//     );
//     setResult(product ? product : { notFound: true });
//   };

//   return (
//     <CheckForm
//       title="Cek Ketersediaan Produk"
//       inputs={[
//         {
//           label: "Kode Produk",
//           type: "text",
//           value: productCode,
//           onChange: (e) => setProductCode(e.target.value),
//           placeholder: "Masukkan kode produk"
//         }
//       ]}
//       buttonText="Cek Stok"
//       onSubmit={handleCheck}
//       error={error}
//     >
//       {result && (
//         result.notFound ? (
//           <ResultCard
//             type="error"
//             icon="❌"
//             message="Kode produk tidak ditemukan."
//           />
//         ) : result.stok > 0 ? (
//           <>
//             <ResultCard
//               type="success"
//               icon="✅"
//               message={`Produk ${result.nama_produk} tersedia`}
//               additionalInfo={`Harga: Rp${result.harga.toLocaleString()}`}
//             >
//               <p className="mt-2">Stok tersedia: {result.stok}</p>
//               <div className="text-center mt-3">
//                 <span role="img" aria-label="cart" className="text-3xl">🛒</span>
//               </div>
//             </ResultCard>
//           </>
//         ) : (
//           <ResultCard
//             type="warning"
//             icon="⚠️"
//             message={`Produk ${result.nama_produk} saat ini habis`}
//             outOfStock
//           />
//         )
//       )}
//     </CheckForm>
//   );
// }



