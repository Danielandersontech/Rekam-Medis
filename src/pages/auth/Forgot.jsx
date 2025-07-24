import { Link } from 'react-router-dom';
import { MailQuestion, BriefcaseMedical } from 'lucide-react'; // Ikon baru untuk lupa password dan logo

export default function Forgot() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-xl md:max-w-3xl lg:max-w-4xl w-full transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-down">
                
                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8 text-white">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="bg-white p-3 rounded-full shadow-md">
                            <BriefcaseMedical size={40} className="text-blue-600" /> {/* Ikon logo yang sama */}
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Tex Medical</h1>
                        <p className="text-blue-100 text-base opacity-90">Hospital Management System</p>
                    </div>
                </div>

                {/* Body Card - Form Lupa Password */}
                <div className="p-8 md:p-10 lg:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
                        <MailQuestion size={24} className="text-blue-500" /> Password Recorvery
                    </h2>
                    <p className="text-center text-gray-600 text-base md:text-lg mt-2 mb-6 leading-relaxed">
                        Enter yout email to receive a reset link.
                    </p>
                    
                    <form className="mt-6 space-y-5 w-full"> {/* Menggunakan space-y-5 dan w-full untuk konsistensi */}
                        <div className="form-control">
                            <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email" // Menambahkan id untuk htmlFor
                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-control pt-4"> {/* Menggunakan pt-4 untuk konsistensi spacing tombol */}
                            <button 
                                type="submit" 
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3.5 rounded-lg text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <MailQuestion size={22} /> Send Reset Link
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-8 text-base md:text-lg"> {/* Menggunakan mt-8 dan text-base md:text-lg untuk konsistensi */}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-200">Back to Login</Link>
                    </div>
                </div>
            </div>

            {/* Animasi (sama seperti halaman register dan login) */}
            <style>{`
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}